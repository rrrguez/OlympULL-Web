import pool from "../db.js";

// EJERCICIOS DESENCHUFADOS

// Obtener todos
export const getAllUnplugged = () => pool.query("SELECT e.*, u.* FROM T_EXERCISES e JOIN T_UNPLUGGED_EXERCISES u ON e.id = u.id;");

// Obtener uno por ID
export const getUnpluggedByid = (id) =>
  pool.query(
    `SELECT e.*, u.rubric
        FROM t_exercises e
        JOIN t_unplugged_exercises u ON e.id = u.id
        WHERE e.id = $1
    `, [id]);

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

// Actualizar un ejercicio
export const updateUnplugged = async (data) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await client.query(`
            UPDATE t_exercises
            SET name = $1,
                description = $2,
                category = $3,
                resources = $4
            WHERE id = $5
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
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

// Eliminar uno
export const removeUnplugged = (id) => {
    pool.query("DELETE FROM t_unplugged_exercises WHERE id=$1", [id]);
    pool.query("DELETE FROM t_exercises WHERE id=$1", [id]);
}

/////////////////////////////////////////////////////////////////////////////////////////
// EJERICIOS ENCHUFADOS

// Obtener todos
export const getAllPluggedIn = () => pool.query("SELECT e.*, u.* FROM T_EXERCISES e JOIN T_PLUGGED_IN_EXERCISES u ON e.id = u.id;");

// Obtener uno por ID - ARREGLAR
export const getPluggedInByid = (id) =>
  pool.query("SELECT * FROM t_exercises WHERE id = $1", [id]);

// Crear uno nuevo
export const createPluggedIn = async (data) => {
    const client = await pool.connect();
    const inputs = data.inputs ? Number(data.inputs) : null;
    const timeLimit = data.time_limit ? Number(data.time_limit) : null;
    const value = data.testcase_value ? Number(data.testcase_value) : null;

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
        `INSERT INTO t_plugged_in_exercises (id, inputs, time_limit, testcase_value)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [exerciseRes.rows[0].id, inputs, timeLimit, value]
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

// Actualizar un ejercicio - ARREGLAR
export const updatePluggedIn = (data) =>
  pool.query(
    "UPDATE t_exercises SET name=$1 WHERE id=$2 RETURNING *",
    [data.name, data.id]
  );

// Eliminar uno
export const removePluggedIn = (id) => {
    pool.query("DELETE FROM t_plugged_in_exercises WHERE id=$1", [id]);
    pool.query("DELETE FROM t_exercises WHERE id=$1", [id]);

}
