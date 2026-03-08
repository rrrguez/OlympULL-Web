import fs from 'fs';
import { buildCmsData } from '../services/cms/buildCmsData.js';
import { deployToCms } from '../services/cms/deployToCms.js';
import { Pool } from 'pg';

export async function deployOlympiadToCms(req, res) {
    try {
        const { olympiadId } = req.params;
        const { commandVariant } = req.params;

        if (!olympiadId) {
            return res.status(400).json({ error: 'No se ha proporcionado un ID de olimpiada' });
        }

        const cmsData = await buildCmsData(olympiadId);

        const sshConfig = {
            host: "10.6.131.206",
            port: 22,
            username: "usuario",
            privateKey: fs.readFileSync('/app/keys/cms_backend_key')
        };

        const remoteDir = '/tmp/cms-contests';

        await deployToCms(cmsData, sshConfig, remoteDir, commandVariant);

        res.status(200).json({ message: 'Olimpiada importada con éxito' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Error inesperado" });
    }
}

export async function retrieveDataFromCms(itineraryId) {
    try {
        const cmsPool = new Pool({
            user: 'postgres',
            host: '10.6.131.206', // IP de la MV CMS
            database: 'cmsdb',
            password: fs.readFileSync('/app/keys/cms_db_password', 'utf8').trim(),
            port: 5432
        });

        const res = await cmsPool.query(
            `
            select
                u.username as username,
                split_part(t.name, '_', 1) as itinerary,
                split_part(t.name, '_', 2) as exercise,
                max(sr.score) as score
            from users u
            join participations p
                on u.id = p.user_id
            join submissions s on
                s.participation_id = p.id
            join submission_results sr
                on sr.submission_id = s.id
            join tasks t
                on t.id = s.task_id
            where split_part(t.name, '_', 1) = $1
            group by username, itinerary, exercise;
            `, [itineraryId]
        );

        const rows = res.rows;

        for (const row of rows) {
        await olympullPool.query(`
            INSERT INTO t_p_ranking (participant, itinerary, exercise, score)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (participant, itinerary, exercise)
            DO UPDATE SET score = EXCLUDED.score;
        `, [row.participant, row.itinerary, row.exercise, row.score]);
        }

        console.log('Ranking sincronizado correctamente');

    } catch (err) {
        console.error('Error sincronizando ranking:', err);
    }
}
