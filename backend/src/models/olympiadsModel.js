import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_olympiads");

export const getById = (id) =>
    pool.query("SELECT * FROM t_olympiads WHERE id = $1", [id]);

export const create = (data) =>
    pool.query(
        "INSERT INTO t_olympiads (id, name, description, year, start, stop, timezone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [data.id, data.name, data.description, data.year, data.start, data.stop, data.timezone]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_olympiads SET id=$1, name=$2, description=$3, year=$4, start=$5, stop=$6, timezone=$7 WHERE id=$8 RETURNING *",
        [data.id, data.name, data.description, data.year, data.start, data.stop, data.timezone, data.oldId]
    );

export const remove = (id) =>
    pool.query("DELETE FROM t_olympiads WHERE id=$1", [id]);
