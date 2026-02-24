import pool from "../../db.js";

// POST: Importar datos desde CSV
export const getAllExercises = async (req, res) => {
    try {
        const { monitor } = req.params;
        const result = await pool.query(
            `
            SELECT
                e.id AS exercise_id,  e.name AS exercise_name,
                i.id AS itinerary_id, i.name AS itinerary_name,
                o.name AS olympiad_name
            FROM t_monitors m
            JOIN t_exercises e
                ON e.id = m.exercise
            JOIN t_itineraries i
                ON i.id = m.itinerary
            JOIN t_olympiads o
                ON o.id = i.olympiad
            WHERE m.id = $1
            ORDER BY e.name
            `
        , [monitor])
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllTeams = async (req, res) => {
    try {
        const { itinerary } = req.params;
        const result = await pool.query(
            `
            SELECT
                t.id AS team_id, t.name AS team_name
            FROM t_teams t
            WHERE t.itinerary = $1
            `
        , [itinerary])
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getRubric = async (req, res) => {
    try {
        const { exercise } = req.params;
        const result = await pool.query(
            `
            SELECT
                r.points AS points, r.labels AS labels
            FROM t_rubrics r
            JOIN t_unplugged_exercises e
                ON e.rubric = r.id
            WHERE e.id = $1
            `
        , [exercise])
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllPunctuations = async (req, res) => {
    try {
        const { monitor } = req.params;
        const result = await pool.query(
            `
            SELECT
                r.score as score,
                o.name as olympiad,
                i.id as itinerary, i.name as itinerary_name,
                e.id as exercise, e.name as exercise_name,
                t.id as team, t.name as team_name
            FROM t_u_ranking r
            JOIN t_itineraries i
            ON i.id = r.itinerary
            JOIN t_olympiads o
            ON o.id = i.olympiad
            JOIN t_exercises e
            ON e.id = r.exercise
            JOIN t_teams t
            ON t.id = r.team
            WHERE r.exercise IN (
                SELECT m.exercise FROM t_monitors m
                WHERE m.id = $1
            )
            `
        , [monitor])
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getPunctuation = async (req, res) => {
    try {
        const { team, exercise, itinerary } = req.params;
        const result = await pool.query(
            `
            SELECT
                r.score as score,
                i.id as itinerary, i.name as itinerary_name,
                e.id as exercise, e.name as exercise_name,
                t.id as team, t.name as team_name
            FROM t_u_ranking r
            JOIN t_itineraries i
            ON i.id = r.itinerary
            JOIN t_olympiads o
            ON o.id = i.olympiad
            JOIN t_exercises e
            ON e.id = r.exercise
            JOIN t_teams t
            ON t.id = r.team
            WHERE r.team=$1 AND r.exercise=$2 AND r.itinerary=$3
            `
        , [team, exercise, itinerary])
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const punctuateTeam = async (req, res) => {
    try {
        const { team, exercise, itinerary, score } = req.body;
        const result = await pool.query(
            `
            INSERT INTO T_U_RANKING (team, exercise, itinerary, score) VALUES ($1, $2, $3, $4) RETURNING *;
            `
        , [team, exercise, itinerary, score])

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') { // Duplicate key
            if (err.constraint === 't_u_ranking_pkey') {
                res.status(400).json({
                    error: "El equipo seleccionado ya ha sido puntuado en ese ejercicio",
                    code: err.code
                });
            }
        }
    }
}

export const editPunctuation = async (req, res) => {
    try {
        const { team, exercise, itinerary } = req.params;
        const { score } = req.body;
        const intScore = parseInt(score, 10);
        const result = await pool.query(
            `
            UPDATE t_u_ranking SET score=$1 WHERE team=$2 AND exercise=$3 AND itinerary=$4 RETURNING *;
            `
        , [intScore, team, exercise, itinerary])

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const removePunctuation = async (req, res) => {
    try {
        const { team, exercise, itinerary } = req.params;
        const result = await pool.query(
            `
            DELETE FROM t_u_ranking WHERE team=$1 AND exercise=$2 AND itinerary=$3;
            `
        , [team, exercise, itinerary])
        return res.status(200).json({
            message: "Puntuación eliminada correctamente"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    getAllExercises,
    getAllTeams,
    getRubric,
    getAllPunctuations,
    getPunctuation,
    punctuateTeam,
    editPunctuation,
    removePunctuation
}
