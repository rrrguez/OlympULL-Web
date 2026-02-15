import pool from "../db.js";

// Obtener todos
export const getAll = () =>
    pool.query(
        `
        SELECT
            c.*,
            e.name AS exercise_name,
            o.name AS olympiad_name,
            i.name AS itinerary_name
        FROM T_EXERCISES_OLYMPIAD_ITINERARY c
        JOIN t_exercises e
            ON c.exercise = e.id
        JOIN t_olympiads o
            ON c.olympiad = o.id
        JOIN t_itineraries i
            ON c.itinerary = i.id
        ORDER BY e.name, o.name, i.name
        `
    );

export const getOlympiads = (exercise) =>
    pool.query(
        `SELECT
            a.olympiad,
            o.name AS olympiad_name
            FROM T_EXERCISES_OLYMPIAD_ITINERARY a
            JOIN t_olympiads o
                ON a.olympiad = o.id
            WHERE EXERCISE = $1`, [exercise]
    );

export const getItineraries = (data) =>
    pool.query(
        `SELECT
            a.itinerary,
            i.name AS itinerary_name
        FROM T_EXERCISES_OLYMPIAD_ITINERARY a
        JOIN t_itineraries i
            ON a.itinerary = i.id
        WHERE EXERCISE=$1 AND a.OLYMPIAD=$2`, [data.exercise, data.olympiad]
    );

// Crear uno nuevo
export const create = async (data) => {

  pool.query(
    "INSERT INTO t_exercises_olympiad_itinerary (exercise, olympiad, itinerary) VALUES ($1, $2, $3) RETURNING *",
    [data.exercise, data.olympiad, data.itinerary]
  );
}

// Eliminar uno
export const remove = (data) => {
    pool.query(
        `
        DELETE
        FROM t_exercises_olympiad_itinerary
        WHERE exercise=$1
          AND olympiad=$2
          AND itinerary=$3
        `, [data.exercise, data.olympiad, data.itinerary]
    );
}
