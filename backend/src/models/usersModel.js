import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_users");

export const getById = ( id ) =>
    pool.query("SELECT * FROM t_users WHERE id = $1", [id]);

export const create = ( data ) =>
    pool.query(
        "INSERT INTO t_users (id, username, password, type) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.id, data.username, data.password, data.type]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_users SET id=$1 WHERE id=$2 RETURNING *",
        [data.username, data.id]
    );

export const updatePassword = (data) =>
    pool.query(
        "UPDATE t_users SET password=$2 WHERE id=$1 RETURNING *",
        [data.id, data.password]
    );

export const remove = ( id ) =>
    pool.query(
        "DELETE FROM t_users WHERE id = $1", [id]);
