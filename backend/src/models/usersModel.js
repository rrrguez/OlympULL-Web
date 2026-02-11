import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_users");

export const getById = ( id ) =>
    pool.query("SELECT * FROM t_users WHERE id = $1", [id]);

export const getByType = ( type ) =>
    pool.query("SELECT * FROM t_users WHERE type = $1", [type]);

export const create = ( data ) =>
    pool.query(
        "INSERT INTO t_users (id, username, password, type) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.id, data.username, data.password, data.type]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_users SET username=$2,password=$3,type=$4 WHERE id=$1 RETURNING *",
        [data.id, data.username, data.password, data.type]
    );

export const updatePassword = (data) =>
    pool.query(
        "UPDATE t_users SET password=$2 WHERE id=$1 RETURNING *",
        [data.id, data.password]
    );

export const remove = ( id ) =>
    pool.query(
        "DELETE FROM t_users WHERE id = $1", [id]);
