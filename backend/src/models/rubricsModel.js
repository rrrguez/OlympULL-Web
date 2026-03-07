import pool from "../db.js";

export const getAll = () => pool.query("SELECT * FROM T_RUBRICS ORDER BY name");

export const getById = (id) =>
    pool.query("SELECT * FROM T_RUBRICS WHERE id = $1", [id]);

export const create = (data) =>
    pool.query(
        `
        INSERT INTO T_RUBRICS (id, name, description, points, labels)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, [data.id, data.name, data.description, data.points, data.labels]
    );

export const duplicate = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT COALESCE(
            MAX((regexp_match(id, $1 || '-([0-9]+)$'))[1]::int),
            0
        ) + 1 AS next_copy
        FROM t_rubrics
        WHERE id ~ ('^' || $1 || '-[0-9]+$');
        `,
        [id]
    );

    const next = rows[0].next_copy;
    const newId = `${id}-${next}`;

    const result = await pool.query(
        `
        INSERT INTO t_rubrics (id, name, description, points, labels)
        SELECT
            $1,
            name || ' (copia ' || $2 || ')',
            description,
            points,
            labels
        FROM t_rubrics
        WHERE id = $3
        RETURNING *
        `,
        [newId, next, id]
    );
    return result.rows[0];
};

export const update = (data) =>
    pool.query(
        `
        UPDATE T_RUBRICS
        SET
            name=$2,
            description=$3,
            points=$4,
            labels=$5
        WHERE id=$1
        RETURNING *
        `, [data.id, data.name, data.description, data.points, data.labels]
    );

export const remove = (id) =>
    pool.query("DELETE FROM T_RUBRICS WHERE id=$1", [id]);
