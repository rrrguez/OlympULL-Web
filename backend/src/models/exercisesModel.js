import pool from "../db.js";
import fs from "fs/promises";
import path from "path";

// EJERCICIOS DESENCHUFADOS

// Obtener todos
export const getAllUnplugged = () =>
    pool.query(
        `
        SELECT
            e.*,
            u.*,
            r.name AS rubric_name
        FROM T_EXERCISES e
        JOIN T_UNPLUGGED_EXERCISES u
            ON e.id = u.id
        JOIN t_rubrics r
            ON u.rubric=r.id
        ORDER BY e.name;
        `
    );

// Obtener uno por ID
export const getUnpluggedByid = (id) =>
    pool.query(
        `
        SELECT
            e.*,
            u.rubric
        FROM t_exercises e
        JOIN t_unplugged_exercises u
            ON e.id = u.id
        WHERE e.id = $1
        `,[id]
    );

// Crear uno nuevo
export const createUnplugged = async (data) => {
    // Hay que hacer una transacción ya que son necesarias inserciones en dos tablas distintas, y si no se hace bien, la BD queda inconsistente
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // 1. Insertar en T_EXERCISES
        const exerciseRes = await client.query(
            `INSERT INTO t_exercises (id, name, description, category, resources)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [data.id, data.name, data.description, data.category, data.resources]
        );

        // 2. Insertar en T_UNPLUGGED_EXERCISES
        const unpluggedRes = await client.query(
            `INSERT INTO t_unplugged_exercises (id, rubric)
            VALUES ($1, $2)
            RETURNING *`,
            [exerciseRes.rows[0].id, data.rubric]
        );

        await client.query("COMMIT");

        return {
            ...exerciseRes.rows[0],
            ...unpluggedRes.rows[0]
        };

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const duplicateUnplugged = async (id) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { rows } = await pool.query(
            `
            SELECT COALESCE(
                MAX((regexp_match(id, $1 || '-([0-9]+)$'))[1]::int),
                0
            ) + 1 AS next_copy
            FROM t_exercises
            WHERE id ~ ('^' || $1 || '-[0-9]+$')
            `,
            [id]
        );

        const next = rows[0].next_copy;
        const newId = `${id}-${rows[0].next_copy}`;

        const exerciseRes = await client.query(
            `
            INSERT INTO t_exercises (id, name, description, category, resources)
            SELECT
                $1,
                name || ' (copia ' || $2 || ')',
                description,
                category,
                resources
            FROM t_exercises
            WHERE id = $3
            RETURNING *
            `,
            [newId, next, id]
        );

        const unpluggedRes = await client.query(
            `
            INSERT INTO t_unplugged_exercises (id, rubric)
            SELECT
                $1,
                rubric
            FROM t_unplugged_exercises
            WHERE id = $2
            RETURNING *
            `,
            [newId, id]
        );

        await client.query("COMMIT");

        return {
            ...exerciseRes.rows[0],
            ...unpluggedRes.rows[0]
        };

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

// Actualizar un ejercicio
export const updateUnplugged = async (data) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = await client.query(`
            UPDATE t_exercises
            SET name = $1,
                description = $2,
                category = $3,
                resources = $4
            WHERE id = $5
            RETURNING *
        `, [
            data.name,
            data.description,
            data.category,
            data.resources,
            data.id,
        ]);

        await client.query(`
        UPDATE t_unplugged_exercises
        SET rubric = $1
        WHERE id = $2
        `, [
            data.rubric,
            data.id
        ]);

        await client.query("COMMIT");
        return result;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

// Eliminar uno
export const removeUnplugged = (id) => {
    pool.query("DELETE FROM t_exercises WHERE id=$1", [id]);
}

/////////////////////////////////////////////////////////////////////////////////////////
// EJERICIOS ENCHUFADOS

// Obtener todos
export const getAllPluggedIn = () => pool.query("SELECT e.*, u.* FROM T_EXERCISES e JOIN T_PLUGGED_IN_EXERCISES u ON e.id = u.id ORDER BY e.name;");

// Obtener uno por ID
export const getPluggedInByid = (id) =>
  pool.query("SELECT e.*, u.* FROM T_EXERCISES e JOIN T_PLUGGED_IN_EXERCISES u ON e.id = u.id WHERE e.id = $1 AND u.id = $1", [id]);

// Crear uno nuevo
export const createPluggedIn = async (data) => {
    const client = await pool.connect();
    const inputs = data.inputs ? Number(data.inputs) : null;
    const timeLimit = data.time_limit ? Number(data.time_limit) : null;

    try {
        await client.query("BEGIN");

        // 1. Insertar en T_EXERCISES
        const exerciseRes = await client.query(
            `INSERT INTO t_exercises (id, name, description, category, resources)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [data.id, data.name, data.description, data.category, data.resources]
        );

        // 2. Insertar en T_PLUGGED_IN_EXERCISES
        const PluggedInRes = await client.query(
            `INSERT INTO t_plugged_in_exercises (id, inputs, time_limit, wording_file, input_files, output_files)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [exerciseRes.rows[0].id, inputs, timeLimit, data.wording_file, data.input_files, data.output_files]
        );

        await client.query("COMMIT");

        return {
            ...exerciseRes.rows[0],
            ...PluggedInRes.rows[0]
        };

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const duplicatePluggedIn = async (id) => {
    const base = "uploads";

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { rows: originalRows } = await client.query(
            `
            SELECT e.*, p.inputs, p.time_limit,
                   p.wording_file, p.input_files, p.output_files
            FROM t_exercises e
            JOIN t_plugged_in_exercises p ON e.id = p.id
            WHERE e.id = $1
            `,
            [id]
        );

        if (originalRows.length === 0) throw new Error("Ejercicio no encontrado");
        const ex = originalRows[0];

        const { rows } = await client.query(
            `
            SELECT COALESCE(
                MAX((regexp_match(id, $1 || '-([0-9]+)$'))[1]::int),
                0
            ) + 1 AS next_copy
            FROM t_exercises
            WHERE id ~ ('^' || $1 || '-[0-9]+$')
            `,
            [id]
        );

        const next = rows[0].next_copy;
        const newId = `${id}-${next}`;

        const files = [
            { src: path.join(base, "wordings", ex.wording_file), dest: path.join(base, "wordings", `${newId}.pdf`) },
            { src: path.join(base, "inputs", ex.input_files), dest: path.join(base, "inputs", `${newId}.zip`) },
            { src: path.join(base, "outputs", ex.output_files), dest: path.join(base, "outputs", `${newId}.zip`) }
        ];

        for (const f of files) {
            if (f.src) {
                try {
                    await fs.copyFile(f.src, f.dest);
                } catch (err) {
                    if (err.code !== "ENOENT") throw err; // ignora si no existe
                }
            }
        }

        // Insertar en t_exercises
        const exerciseRes = await client.query(
            `
            INSERT INTO t_exercises (id, name, description, category, resources)
            SELECT
                $1,
                name || ' (copia ' || $2 || ')',
                description,
                category,
                resources
            FROM t_exercises
            WHERE id = $3
            RETURNING *
            `, [newId, next, id]
        );

        // Insertar en t_plugged_in_exercises
        const pluggedRes = await client.query(
            `
            INSERT INTO t_plugged_in_exercises (id, inputs, time_limit, wording_file, input_files, output_files)
            SELECT
                $1,
                inputs,
                time_limit,
                $2,
                $3,
                $4
            FROM t_plugged_in_exercises
            WHERE id = $5
            RETURNING *
            `,
            [
                newId,
                `${newId}.pdf`,
                `${newId}.zip`,
                `${newId}.zip`,
                id
            ]
        );

        await client.query("COMMIT");

        return {
            ...exerciseRes.rows[0],
            ...pluggedRes.rows[0]
        };

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};

// Actualizar un ejercicio
export const updatePluggedIn = async (data) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = await client.query(
            `
            UPDATE t_exercises
            SET name = $1,
                description = $2,
                category = $3,
                resources = $4
            WHERE id = $5 RETURNING *
            `,
            [
            data.name,
            data.description,
            data.category,
            data.resources,
            data.id,
            ]
        );

        await client.query(
            `
            UPDATE t_plugged_in_exercises
            SET inputs = $1,
                time_limit = $2,
                wording_file = COALESCE($3, wording_file),
                input_files = COALESCE($4, input_files),
                output_files = COALESCE($5, output_files)
            WHERE id = $6 RETURNING *
            `,
            [
                data.inputs,
                data.time_limit,
                data.wording_file,
                data.input_files,
                data.output_files,
                data.id
            ]
        );

        await client.query("COMMIT");

        return result;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

// Eliminar uno
export const removePluggedIn = (id) => {
    pool.query("DELETE FROM t_exercises WHERE id=$1", [id]);
}
