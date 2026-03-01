import fs from 'fs';
import path from 'path';
import { Client } from 'ssh2';
import { prepareCmsDirectory } from './prepareCmsDirectory.js';
import csvParser from 'csv-parser';

// Upload the temp directory via SFTP
function uploadDirectory(sftp, localDir, remoteDir) {
    return new Promise((resolve, reject) => {
        fs.readdir(localDir, { withFileTypes: true }, async (err, entries) => {
            if (err) return reject(err);

            try {
                for (const entry of entries) {
                    const localPath = path.join(localDir, entry.name);
                    const remotePath = path.posix.join(remoteDir, entry.name);

                    if (entry.isDirectory()) {
                        await new Promise((res, rej) =>
                            sftp.mkdir(remotePath, { mode: 0o755 }, err => {
                                if (err && err.code !== 4) return rej(err); // ignores if exists
                                res();
                            })
                        );

                        await uploadDirectory(sftp, localPath, remotePath);
                    } else {
                        await new Promise((res, rej) =>
                            sftp.fastPut(localPath, remotePath, err =>
                                err ? rej(err) : res()
                            )
                        );
                    }
                }

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
}

export async function deployToCms(cmsData, sshConfig, remoteDir, commandVariant) {
    // Create the local directory
    const contestDir = prepareCmsDirectory(cmsData);
    const remoteContestPath = path.posix.join(remoteDir, cmsData.name);

    const conn = new Client();

    await new Promise((resolve, reject) => {
        conn.on('ready', resolve)
            .on('error', reject)
            .connect(sshConfig);
    });

    console.log("Connected")

    // Check if the remote dir already exists
    /**
    await new Promise((resolve, reject) => {
        conn.exec(`rm -rf ${remoteContestPath} && mkdir -p ${remoteContestPath}`, (err, stream) => {
            if (err) return reject(err);
            stream.on('close', resolve);
        });
    });

    console.log("Check made")
    */

    // Upload the directory
    const sftp = await new Promise((resolve, reject) => {
        conn.sftp((err, sftp) => err ? reject(err) : resolve(sftp));
    });

    console.log("Uploading...")
    await uploadDirectory(sftp, contestDir, remoteContestPath);

    // Execute the command
    await new Promise((resolve, reject) => {
        let command;

        console.log(commandVariant)

        if (commandVariant === "importContest") {
            command = `cmsImportContest --import-task ${remoteContestPath}`;
        } else if (commandVariant === "importUsers") {
            command = `cmsImportUser -A ${remoteContestPath}`;
        } else if (commandVariant === "updateContest") {
            command = `cmsImportContest --import-task --update-contest ${remoteContestPath}`;
        } else {
            return reject(new Error("Invalid command variant"));
        }

        conn.exec(`bash -lc "source ./cms-venv/bin/activate && ${command}"`, (err, stream) => {
            if (err) return reject(err);

            stream
                .on('close', (code) => {
                    if (code !== 0) reject(new Error(`Remote command failed with code ${code}`));
                    else resolve();
                })
                .on('data', data => process.stdout.write(data))
                .stderr.on('data', errData => process.stderr.write(errData));
        });
    });

    conn.end();

    // Clean local temp dir
    //fs.rmSync(contestDir, { recursive: true, force: true });
}
