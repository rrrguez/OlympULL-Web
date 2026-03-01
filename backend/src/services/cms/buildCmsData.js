// services/cms/buildCmsData.js

import { getOlympiadByID, getPluggedInExercises, getParticipants } from '../../models/cmsModel.js';

export async function buildCmsData(olympiadId) {
    const olympiadResult = await getOlympiadByID(olympiadId);
    const olympiad = olympiadResult.rows[0]

    if (!olympiad) {
        throw new Error('Olympiad not found');
    }

    const exercisesResult = await getPluggedInExercises(olympiadId);
    const exercises = exercisesResult.rows;

    const usersResult = await getParticipants(olympiadId);
    const users = usersResult.rows;

    const cmsExercises = exercises.map(exercise => {
        return {
            name: exercise.id,
            title: `[${exercise.itinerary_name}] ${exercise.name}`,
            nInput: exercise.inputs,
            timeLimit: exercise.timeLimit,

            // NOT for YAML
            statementFile: exercise.statementFile,
            inputsPath: exercise.inputsPath,
            outputsPath: exercise.outputsPath
        };
    });

    const cmsUsers = users.map(user => ({
        username: user.username,
        password: user.password
    }));

    return {
        name: olympiad.id,
        description: olympiad.name,
        start: olympiad.start,
        stop: olympiad.stop,
        timezone: olympiad.timezone,
        tokenMode: "disabled",
        scoreMode: "max",
        users: cmsUsers,
        exercises: cmsExercises
    };
}
