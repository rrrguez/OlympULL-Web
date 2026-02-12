import pool from "../db.js";

export const getAll = () =>
    pool.query(
        `
        SELECT
            p.*,
            u.username AS participant_name,
            s.name AS school_name,
            o.name AS olympiad_name,
            i.name AS itinerary_name
        FROM t_participants p
        JOIN t_itineraries i
            ON p.itinerary = i.id
        JOIN t_schools s
            ON p.school = s.id
        JOIN t_olympiads o
            ON i.olympiad = o.id
        JOIN t_users u
            ON p.id = u.id;
        `
    );

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

export const remove = ( data ) =>
    pool.query(
        `
        DELETE
        FROM t_participants
        WHERE id = $1
          AND school = $2
          AND itinerary = $3
        `, [data.id, data.school, data.itinerary]);
