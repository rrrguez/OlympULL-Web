import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_participants");

export const getById = ( id ) =>
    pool.query("SELECT * FROM t_participants WHERE id = $1", [id]);

export const create = ( data ) =>
    pool.query(
        "INSERT INTO t_participants (id,school,itinerary) VALUES ($1, $2, $3) RETURNING *",
        [data.id, data.school, data.itinerary]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_participants SET id=$1,school=$2,itinerary=$3 WHERE id=$4 RETURNING *",
        [data.id, data.school, data.itinerary, data.oldId]
    );

export const remove = ( id ) =>
    pool.query(
        "DELETE FROM t_participants WHERE id = $1", [id]);
