import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_teams");

export const getById = (id) =>
    pool.query("SELECT * FROM t_teams WHERE id = $1", [id]);

export const create = (data) =>
    pool.query(
        "INSERT INTO t_teams (id, name, school, itinerary) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.id, data.name, data.school, data.itinerary]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_teams SET name=$1 WHERE id=$2 RETURNING *",
        [data.name, data.id]
    );

export const remove = (id) =>
    pool.query("DELETE FROM t_teams WHERE id=$1", [id]);
