import pool from "../db.js";

export const getAll = () =>
    pool.query(
        `
        SELECT
            m.*,
            e.name AS exercise_name,
            i.name AS itinerary_name,
            o.name AS olympiad_name
        FROM t_monitors m
        JOIN t_exercises e
            ON m.exercise = e.id
        JOIN t_itineraries i
            ON m.itinerary = i.id
        JOIN t_olympiads o
            ON m.olympiad = o.id
        `
    );

export const getById = ( id ) =>
    pool.query("SELECT * FROM t_monitors WHERE id = $1", [id]);

export const create = ( data ) =>
    pool.query(
        "INSERT INTO t_monitors (id, exercise, itinerary, olympiad) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.id, data.exercise, data.itinerary, data.olympiad]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_monitors SET id=$1 WHERE id=$2 RETURNING *",
        [data.username, data.id]
    );

export const remove = (data) =>
    pool.query(
        `
        DELETE
        FROM t_monitors
        WHERE id=$1
          AND exercise=$2
          AND olympiad=$3
          AND itinerary=$4
        `, [data.id, data.exercise, data.olympiad, data.itinerary]
    );
