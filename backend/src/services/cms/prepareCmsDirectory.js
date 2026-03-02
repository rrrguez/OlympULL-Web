import fs from 'fs';
import path from 'path';
import os from 'os';
import { createContestYaml } from './createContestYaml.js';
import { createTaskYaml } from './createTaskYaml.js';
import unzipper from "unzipper"

async function extractZip(zipPath, destination) {
    await fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: destination }))
        .promise();
}

export async function prepareCmsDirectory(cmsData) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cms-contest-'));
    const contestDir = path.join(tempDir, cmsData.name);
    //const contestDir = tempDir + cmsData.name;
    fs.mkdirSync(contestDir, { recursive: true });

    createContestYaml(contestDir, cmsData);

    for (const exercise of cmsData.exercises) {
        const exDir = path.join(contestDir, exercise.name);
        fs.mkdirSync(exDir, { recursive: true });

        createTaskYaml(exDir, exercise);

        const WORDINGS_DIR = path.join(process.cwd(), 'uploads/wordings');
        const INPUTS_DIR = path.join(process.cwd(), 'uploads/inputs');
        const OUTPUTS_DIR = path.join(process.cwd(), 'uploads/outputs');

        const statementDir = path.join(exDir, `statement`);
        const inputDir = path.join(exDir, `input`);
        const outputDir = path.join(exDir, `output` );

        fs.mkdirSync(statementDir, { recursive: true });
        fs.mkdirSync(inputDir, { recursive: true });
        fs.mkdirSync(outputDir, { recursive: true });

        if (exercise.statementFile) {
            fs.copyFileSync( // Copy wording
                path.join(WORDINGS_DIR, exercise.statementFile),
                path.join(statementDir, path.basename("statement.pdf"))
            );
        }

        // Copiar y descomprimir inputs
        if (exercise.inputsPath) {
            const zipName = path.basename(`${exercise.name}.zip`);
            const zipSource = path.join(INPUTS_DIR, zipName);
            const tempZipPath = path.join(inputDir, zipName);

            if (!fs.existsSync(zipSource)) {
                console.error("Input ZIP not found:", zipSource);
                continue;
            }

            // Copiar ZIP al directorio temporal
            fs.copyFileSync(zipSource, tempZipPath);

            // Extraer ZIP
            await extractZip(tempZipPath, inputDir);

            // Eliminar ZIP después de extraer
            fs.unlinkSync(tempZipPath);
        }

        if (exercise.outputsPath) {

            const zipName = path.basename(`${exercise.name}.zip`);
            const zipSource = path.join(OUTPUTS_DIR, zipName);
            const tempZipPath = path.join(outputDir, zipName);

            if (!fs.existsSync(zipSource)) {
                console.error("Output ZIP not found:", zipSource);
                continue;
            }

            fs.copyFileSync(zipSource, tempZipPath);

            await extractZip(tempZipPath, outputDir);

            fs.unlinkSync(tempZipPath);
        }
    };

    return contestDir;
}
