import pool from "../db.js";

// EJERCICIOS DESENCHUFADOS

// Obtener todos
export const getAll = () => pool.query("SELECT * FROM T_EXERCISES_OLYMPIAD_ITINERARY");

// Obtener uno por ID - ARREGLAR
export const getByid = (exercise, olympiad, itinerary) =>
  pool.query("SELECT * FROM t_exercises WHERE exercise = $1 and olympiad = $2 and itinerary = $3;", [exercise, olympiad, itinerary]);

// Crear uno nuevo
export const create = async (data) => {

  pool.query(
    "INSERT INTO t_exercises_olympiad_itinerary (exercise, olympiad, itinerary) VALUES ($1, $2, $3) RETURNING *",
    [data.exercise, data.olympiad, data.itinerary]
  );
}

// Actualizar - ARREGLAR
export const update = (data) =>
  pool.query(
    //
  );

// Eliminar uno - ARREGLAR
export const remove = (exercise, olympiad, itinerary) =>
  pool.query("DELETE FROM t_exercises_olympiad_itinerary WHERE exercise=$1 and olympiad=$2 and itinerary=$3", [exercise, olympiad, itinerary]);
