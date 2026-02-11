import pool from "../db.js";

export const getAll = () =>
    pool.query(
        `
        SELECT
            t.*,
            s.name AS school_name,
            o.name AS olympiad_name,
            i.name AS itinerary_name
        FROM t_teams t
        JOIN t_schools s
            ON t.school = s.id
        JOIN t_itineraries i
            ON t.itinerary = i.id
        JOIN t_olympiads o
            ON i.olympiad = o.id
        ORDER BY t.name;
        `
    );

export const getById = (id) =>
    pool.query("SELECT * FROM t_teams WHERE id = $1", [id]);

export const create = (data) =>
    pool.query(
        "INSERT INTO t_teams (id, name, school, itinerary) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.id, data.name, data.school, data.itinerary]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_teams SET name=$1,school=$2,itinerary=$3 WHERE id=$4 RETURNING *",
        [data.name, data.school, data.itinerary, data.id]
    );

export const remove = (id) =>
    pool.query("DELETE FROM t_teams WHERE id=$1", [id]);
