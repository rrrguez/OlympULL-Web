import pool from "../db.js";

export const getAll = () => pool.query("SELECT i.*, o.name AS olympiad_name FROM t_itineraries i JOIN t_olympiads o ON i.olympiad=o.id");
export const getByid = (id) =>
  pool.query("SELECT i.*, o.name as olympiad_name FROM t_itineraries i JOIN t_olympiads o ON i.olympiad=o.id WHERE i.id = $1", [id]);
export const getByOlympiad = (olympiadId) =>
    pool.query(
      "SELECT i.*, o.name as olympiad_name FROM t_itineraries i JOIN t_olympiads o ON i.olympiad=o.id WHERE i.olympiad = $1",
      [olympiadId]
    );
export const create = (data) =>
  pool.query(
    "INSERT INTO t_itineraries (id, name, description, olympiad) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.id, data.name, data.description, data.olympiad]
  );
export const update = (data) =>
  pool.query(
    "UPDATE t_itineraries SET name=$2,description=$3,olympiad=$4 WHERE id=$1 RETURNING *",
    [data.id, data.name, data.description, data.olympiad]
  );

export const remove = (id) =>
  pool.query("DELETE FROM t_itineraries WHERE id=$1", [id]);
