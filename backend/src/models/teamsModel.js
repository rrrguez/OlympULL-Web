import pool from "../db.js";

export const getAll = () =>
    pool.query(
        `
        SELECT
            t.*,
            s.name AS school_name, s.town as school_town,
            o.name AS olympiad_name,
            i.name AS itinerary_name
        FROM t_teams t
        JOIN t_schools s
            ON t.school = s.id
        JOIN t_itineraries i
            ON t.itinerary = i.id
        JOIN t_olympiads o
            ON i.olympiad = o.id
        ORDER BY t.name, s.name, o.name, i.name;
        `
    );

export const getById = (id) =>
    pool.query(
        `
        SELECT
            t.*,
            i.olympiad as olympiad
        FROM t_teams t
        JOIN t_itineraries i
            ON t.itinerary = i.id
        WHERE t.id = $1
        `, [id]);

export const create = (data) =>
    pool.query(
        "INSERT INTO t_teams (id, name, school, itinerary) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.id, data.name, data.school, data.itinerary]
    );

export const duplicate = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT COALESCE(
            MAX((regexp_match(id, $1 || '-([0-9]+)$'))[1]::int),
            0
        ) + 1 AS next_copy
        FROM t_teams
        WHERE id ~ ('^' || $1 || '-[0-9]+$');
        `,
        [id]
    );

    const next = rows[0].next_copy;
    const newId = `${id}-${next}`;

    const result = await pool.query(
        `
        INSERT INTO t_teams (id, name, school, itinerary)
        SELECT
            $1,
            name || ' (copia ' || $2 || ')',
            school,
            itinerary
        FROM t_teams
        WHERE id = $3
        RETURNING *
        `,
        [newId, next, id]
    );
    return result.rows[0];
}

export const update = (data) =>
    pool.query(
        "UPDATE t_teams SET name=$1,school=$2,itinerary=$3 WHERE id=$4 RETURNING *",
        [data.name, data.school, data.itinerary, data.id]
    );

export const remove = (id) =>
    pool.query("DELETE FROM t_teams WHERE id=$1", [id]);
