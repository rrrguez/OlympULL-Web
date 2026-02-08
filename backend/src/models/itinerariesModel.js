import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_itineraries");
export const getByid = (id) =>
  pool.query("SELECT * FROM t_itineraries WHERE id = $1", [id]);
export const getByOlympiad = (olympiadId) =>
    pool.query(
      "SELECT * FROM t_itineraries WHERE olympiad = $1",
      [olympiadId]
    );
export const create = (data) =>
  pool.query(
    "INSERT INTO t_itineraries (id, name, description, olympiad) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.id, data.name, data.description, data.olympiad]
  );
export const update = (data) =>
  pool.query(
    "UPDATE t_itineraries SET id=$1,name=$2,description=$3,olympiad=$4 WHERE id=$5 RETURNING *",
    [data.id, data.name, data.description, data.olympiad, data.oldId]
  );

export const remove = (id) =>
  pool.query("DELETE FROM t_itineraries WHERE id=$1", [id]);
