import fs from 'fs';
import path from 'path';
import { Client } from 'ssh2';
import { prepareCmsDirectory } from './prepareCmsDirectory.js';
import { parseCmsError } from '../../utils/cmsErrorParser.js';

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
                console.log(error)
            }
        });
    });
}

export async function deployToCms(cmsData, sshConfig, remoteDir, commandVariant) {
    // Create the local directory
    const contestDir = await prepareCmsDirectory(cmsData);
    const remoteContestPath = path.posix.join(remoteDir, cmsData.name);

    const conn = new Client();

    await new Promise((resolve, reject) => {
        conn.on('ready', resolve)
            .on('error', reject)
            .connect(sshConfig);
    });

    // Create the remote dir
    await new Promise((resolve, reject) => {
        conn.exec(`rm -rf ${remoteContestPath} && mkdir -p ${remoteContestPath}`, (err, stream) => {
            if (err) return reject(err);

            stream
                .on('close', (code) => {
                    if (code !== 0) reject(new Error(`mkdir failed with code ${code}`));
                    else resolve();
                })
                .on('data', () => {}) // consume stdout
                .stderr.on('data', () => {}); // consume stderr
        });
    });
    const sftp = await new Promise((resolve, reject) => {
        conn.sftp((err, sftp) => err ? reject(err) : resolve(sftp));
    });

    await uploadDirectory(sftp, contestDir, remoteContestPath);

    // Execute the command
    await new Promise((resolve, reject) => {
        let command;

        if (commandVariant === "importContest") {
            command = `cmsImportContest --import-task ${remoteContestPath}`;
        } else if (commandVariant === "importUsers") {
            command = `cmsImportUser -A ${remoteContestPath}`;
        } else if (commandVariant === "updateContest") {
            command = `cmsImportContest --import-task --update-contest --update-tasks ${remoteContestPath}`;
        } else {
            return reject(new Error("Invalid command variant"));
        }

        conn.exec(`bash -lc "source ./cms-venv/bin/activate && ${command}"`, (err, stream) => {
            if (err) return reject(err);

            let stdout = "";
            let stderr = "";

            stream.on("close", (code) => {
                if (code !== 0) {
                    // Combinar stdout y stderr
                    const combined = (stderr || stdout).trim();
                    const parsedMessage = parseCmsError(combined);

                    return reject(new Error(parsedMessage || `Remote command failed with code ${code}`));
                }
                resolve();
            });

            stream.on("data", data => {
                stdout += data.toString();
            });

            stream.stderr.on("data", data => {
                stderr += data.toString();
            });
        });
    });

    conn.end();

    // Clean local temp dir
    //fs.rmSync(contestDir, { recursive: true, force: true });
}
