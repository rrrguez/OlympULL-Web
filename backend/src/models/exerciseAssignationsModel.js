import pool from "../db.js";

// Obtener todos
export const getAll = () => pool.query("SELECT * FROM T_EXERCISES_OLYMPIAD_ITINERARY");

export const getOlympiads = (exercise) =>
    pool.query(
        "SELECT OLYMPIAD FROM T_EXERCISES_OLYMPIAD_ITINERARY WHERE EXERCISE = $1", [exercise]
    );

export const getItineraries = (data) =>
    pool.query(
        "SELECT OLYMPIAD FROM T_EXERCISES_OLYMPIAD_ITINERARY WHERE EXERCISE=$1 AND OLYMPIAD=$2", [data.exercise, data.olympiad]
    );

// Crear uno nuevo
export const create = async (data) => {

  pool.query(
    "INSERT INTO t_exercises_olympiad_itinerary (exercise, olympiad, itinerary) VALUES ($1, $2, $3) RETURNING *",
    [data.exercise, data.olympiad, data.itinerary]
  );
}

// Eliminar uno
export const remove = (exercise, olympiad, itinerary) =>
  pool.query("DELETE FROM t_exercises_olympiad_itinerary WHERE exercise=$1 and olympiad=$2 and itinerary=$3", [exercise, olympiad, itinerary]);
