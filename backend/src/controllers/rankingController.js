import pool from "../db.js";
import { retrieveDataFromCms as retriever } from "./cmsController.js";

export const getUnpluggedRanking = async (req, res) => {
    try {
        const { itinerary } = req.params;
        const result = await pool.query(
            `
            SELECT
                r.*,
                t.name as team_name,
                e.name as ex_name, e.category as ex_category
            FROM t_u_ranking r
            JOIN t_teams t
                ON t.id = r.team
            JOIN t_exercises e
                ON e.id = r.exercise
            WHERE r.itinerary = $1
            ORDER BY r.team, r.itinerary, r.exercise;
            `
        , [itinerary])
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPluggedInRanking = async (req, res) => {
    try {
        const { itinerary } = req.params;
        const result = await pool.query(
            `
            SELECT
                r.*,
                e.name as ex_name, e.category as ex_category
            FROM t_p_ranking r
            JOIN t_exercises e
                ON e.id = r.exercise
            WHERE itinerary = $1
            ORDER BY r.participant, r.itinerary, r.exercise;
            `
        , [itinerary])

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const checkExercises = async (req,res) => {
    try {
        const { itineraryId } = req.params;
        const result = await pool.query(
            `
            SELECT
                EXISTS (
                    SELECT 1
                    FROM T_EXERCISES_OLYMPIAD_ITINERARY A
                    JOIN T_UNPLUGGED_EXERCISES U ON A.EXERCISE = U.ID
                    WHERE A.ITINERARY = $1
                ) AS unplugged,
                EXISTS (
                    SELECT 1
                    FROM T_EXERCISES_OLYMPIAD_ITINERARY A
                    JOIN T_PLUGGED_IN_EXERCISES P ON A.EXERCISE = P.ID
                    WHERE A.ITINERARY = $1
                ) AS pluggedIn;
            `
        , [itineraryId])

        const { rows } = result;

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const retrieveDataFromCms = async (req, res) => {
    const { itineraryId } = req.params;
    try {
      const cmsData = await retriever(itineraryId);
      res.json(cmsData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
}

export default {
    getUnpluggedRanking,
    getPluggedInRanking
}
