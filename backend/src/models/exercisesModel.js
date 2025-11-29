import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_exercises");
export const getByid = (id) =>
  pool.query("SELECT * FROM t_exercises WHERE id = $1", [id]);
export const create = (data) =>
  pool.query(
    "INSERT INTO t_exercises (id, name, description, category, resources) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.id, data.name, data.description, data.category, data.resources]
  );
export const update = (data) =>
  pool.query(
    "UPDATE t_exercises SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, data.id]
  );
export const remove = (id) =>
  pool.query("DELETE FROM t_exercises WHERE id=$1", [id]);
