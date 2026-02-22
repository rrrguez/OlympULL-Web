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
                t.id AS team_id,  t.name AS team_name
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
                r.*
            FROM t_u_ranking r
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

export default {
    getAllExercises,
    getAllTeams,
    getRubric,
    getAllPunctuations
}
