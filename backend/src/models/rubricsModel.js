import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM T_RUBRICS");
export const getById = (id) =>
  pool.query("SELECT * FROM T_RUBRICS WHERE id = $1", [id]);
export const create = (data) =>
  pool.query(
    "INSERT INTO T_RUBRICS (id, name, description, points, labels) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.id, data.name, data.description, data.points, data.labels]
  );
export const update = (data) =>
  pool.query(
    "UPDATE T_RUBRICS SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, data.id]
  );
export const remove = (id) =>
  pool.query("DELETE FROM T_RUBRICS WHERE id=$1", [id]);
