import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM T_RUBRICS ORDER BY name");
export const getById = (id) =>
  pool.query("SELECT * FROM T_RUBRICS WHERE id = $1", [id]);
export const create = (data) =>
  pool.query(
    "INSERT INTO T_RUBRICS (id, name, description, points, labels) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.id, data.name, data.description, data.points, data.labels]
  );
export const update = (data) =>
  pool.query(
    "UPDATE T_RUBRICS SET name=$2,description=$3,points=$4,labels=$5 WHERE id=$1 RETURNING *",
    [data.id, data.name, data.description, data.points, data.labels]
  );
export const remove = (id) =>
  pool.query("DELETE FROM T_RUBRICS WHERE id=$1", [id]);
