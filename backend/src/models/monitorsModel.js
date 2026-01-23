import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_monitors");

export const getById = ( id ) =>
    pool.query("SELECT * FROM t_monitors WHERE id = $1", [id]);

export const create = ( data ) =>
    pool.query(
        "INSERT INTO t_monitors (id, exercise, itinerary, olympiad) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.id, data.exercise, data.itinerary, data.olympiad]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_monitors SET id=$1 WHERE id=$2 RETURNING *",
        [data.username, data.id]
    );

export const remove = ( id ) =>
    pool.query(
        "DELETE FROM t_monitors WHERE id = $1", [id]);
