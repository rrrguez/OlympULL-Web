import pool from "../db.js";

export const getAll = () =>
    pool.query(
        `SELECT
            i.*,
            o.name AS olympiad_name
        FROM t_itineraries i
        JOIN t_olympiads o
            ON i.olympiad=o.id
        ORDER BY o.name, i.name
        `
    );

export const getByid = (id) =>
    pool.query(
        `
        SELECT
            i.*,
            o.name as olympiad_name
        FROM t_itineraries i
        JOIN t_olympiads o
            ON i.olympiad=o.id
        WHERE i.id = $1
        `, [id]
    );

export const getByOlympiad = (olympiadId) =>
    pool.query(
        `
        SELECT
            i.*,
            o.name as olympiad_name
        FROM t_itineraries i
        JOIN t_olympiads o
            ON i.olympiad=o.id
        WHERE i.olympiad = $1
        `, [olympiadId]
    );

export const create = (data) =>
    pool.query(
        `
        INSERT INTO t_itineraries (id, name, description, olympiad)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [data.id, data.name, data.description, data.olympiad]
    );

export const duplicate = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT COALESCE(
            MAX((regexp_match(id, $1 || '-([0-9]+)$'))[1]::int),
            0
        ) + 1 AS next_copy
        FROM t_itineraries
        WHERE id ~ ('^' || $1 || '-[0-9]+$');
        `,
        [id]
    );

    const next = rows[0].next_copy;
    const newId = `${id}-${next}`;

    const result = await pool.query(
        `
        INSERT INTO t_itineraries (id, name, description, olympiad)
        SELECT
            $1,
            name || ' (copia ' || $2 || ')',
            description,
            olympiad
        FROM t_itineraries
        WHERE id = $3
        RETURNING *
        `,
        [newId, next, id]
    );
    return result.rows[0];
}

export const update = (data) =>
    pool.query(
        `
        UPDATE t_itineraries
        SET
            name=$2,
            description=$3,
            olympiad=$4
        WHERE id=$1
        RETURNING *
        `, [data.id, data.name, data.description, data.olympiad]
    );

export const remove = (id) =>
    pool.query("DELETE FROM t_itineraries WHERE id=$1", [id]);
