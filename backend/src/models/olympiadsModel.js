import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM t_olympiads ORDER BY name");

export const getById = (id) =>
    pool.query("SELECT * FROM t_olympiads WHERE id = $1", [id]);

export const create = (data) =>
    pool.query(
        "INSERT INTO t_olympiads (id, name, description, year, start, stop, timezone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [data.id, data.name, data.description, data.year, data.start, data.stop, data.timezone]
    );

export const duplicate = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT COALESCE(
            MAX((regexp_match(id, $1 || '-([0-9]+)$'))[1]::int),
            0
        ) + 1 AS next_copy
        FROM t_olympiads
        WHERE id ~ ('^' || $1 || '-[0-9]+$');
        `,
        [id]
    );

    const next = rows[0].next_copy;
    const newId = `${id}-${next}`;

    const result = await pool.query(
        `
        INSERT INTO t_olympiads (id, name, description, year, start, stop, timezone)
        SELECT
            $1,
            name || ' (copia ' || $2 || ')',
            description,
            year,
            start,
            stop,
            timezone
        FROM t_olympiads
        WHERE id = $3
        RETURNING *
        `,
        [newId, next, id]
    );
    return result.rows[0];
}

export const update = (data) =>
    pool.query(
        "UPDATE t_olympiads SET name=$1, description=$2, year=$3, start=$4, stop=$5, timezone=$6 WHERE id=$7 RETURNING *",
        [data.name, data.description, data.year, data.start, data.stop, data.timezone, data.id]
    );

export const remove = (id) =>
    pool.query("DELETE FROM t_olympiads WHERE id=$1", [id]);
