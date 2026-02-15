import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_schools ORDER BY name, town");

export const getById = (id) =>
    pool.query("SELECT * FROM t_schools WHERE id = $1", [id]);

export const create = (data) =>
    pool.query(
        "INSERT INTO t_schools (id, name, town) VALUES ($1, $2, $3) RETURNING *",
        [data.id, data.name, data.town]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_schools SET name=$1, town=$2 WHERE id=$3 RETURNING *",
        [data.name, data.town, data.id]
    );

export const remove = (id) =>
    pool.query("DELETE FROM t_schools WHERE id=$1", [id]);
