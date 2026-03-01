import fs from 'fs';
import path from 'path';
import os from 'os';
import { createContestYaml } from './createContestYaml.js';
import { createTaskYaml } from './createTaskYaml.js';

export function prepareCmsDirectory(cmsData) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cms-contest-'));
    const contestDir = path.join(tempDir, cmsData.name);
    fs.mkdirSync(contestDir, { recursive: true });

    createContestYaml(contestDir, cmsData);

    cmsData.exercises.forEach(exercise => {
        const exDir = path.join(contestDir, exercise.name);
        fs.mkdirSync(exDir, { recursive: true });

        createTaskYaml(exDir, exercise);

        const WORDINGS_DIR = path.join(process.cwd(), 'uploads/wordings');
        const INPUTS_DIR = path.join(process.cwd(), 'uploads/inputs');
        const OUTPUTS_DIR = path.join(process.cwd(), 'uploads/outputs');

        const statementDir = path.join(exDir, 'statement');
        const inputDir = path.join(exDir, 'input');
        const outputDir = path.join(exDir, 'output');

        fs.mkdirSync(statementDir, { recursive: true });
        fs.mkdirSync(inputDir, { recursive: true });
        fs.mkdirSync(outputDir, { recursive: true });

        console.log(exercise.statementFile + " " + exercise.statementDir)
        if (exercise.statementFile) {
            fs.copyFileSync( // Copy wording
                path.join(WORDINGS_DIR, exercise.statementFile),
                path.join(statementDir, path.basename(exercise.statementFile))
            );
        }

        // Copiar inputs
        if (exercise.inputsPath) {
            exercise.inputsPath.forEach(inputFile => {
                fs.copyFileSync(
                    path.join(INPUTS_DIR, inputFile),
                    path.join(inputDir, path.basename(inputFile))
                );
            });
        }

        // Copiar outputs
        if (exercise.outputsPath) {
            exercise.outputsPath.forEach(outputFile => {
                fs.copyFileSync(
                    path.join(OUTPUTS_DIR, outputFile),
                    path.join(outputDir, path.basename(outputFile))
                );
            });
        }
    });

    return contestDir;
}
