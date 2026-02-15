import pool from "../db.js";

export const getAll = () =>
    pool.query(
        `
        SELECT
            og.*,
            u.username AS org_name,
            i.name AS itinerary_name,
            o.name AS olympiad_name
        FROM t_organizers og
        JOIN t_itineraries i
            ON og.itinerary = i.id
        JOIN t_olympiads o
            ON i.olympiad = o.id
        JOIN t_users u
            ON og.id = u.id
        ORDER BY og.id;
        `
    );

export const getById = ( id ) =>
    pool.query("SELECT * FROM t_organizers WHERE id = $1", [id]);

export const create = ( data ) =>
    pool.query(
        "INSERT INTO t_organizers (id, itinerary) VALUES ($1, $2) RETURNING *",
        [data.id, data.itinerary]
    );

export const update = (data) =>
    pool.query(
        "UPDATE t_organizers SET id=$1 WHERE id=$2 RETURNING *",
        [data.username, data.id]
    );

export const remove = ( data ) =>
    pool.query(
        `
        DELETE
        FROM t_organizers
        WHERE id=$1
          AND itinerary=$2
        `, [data.id, data.itinerary]
    );
