import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_itineraries");
export const getByid = (id) =>
  pool.query("SELECT * FROM t_itineraries WHERE id = $1", [id]);
export const create = (data) =>
  pool.query(
    "INSERT INTO t_itineraries (id, name, description, olympiad) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.id, data.name, data.description, data.olympiad]
  );
export const update = (data) =>
  pool.query(
    "UPDATE t_itineraries SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, data.id]
  );
export const remove = (id) =>
  pool.query("DELETE FROM t_itineraries WHERE id=$1", [id]);
