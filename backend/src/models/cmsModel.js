import pool from "../db.js"

// Info básica de la olimpiada para contest.yaml
export const getOlympiadByID = (olympiadId) =>
    pool.query(
        `
        SELECT *
        FROM t_olympiads
        WHERE id = $1
        `, [olympiadId]
    )

export const getPluggedInExercises = (olympiad) =>
    pool.query(
        `
        SELECT
            p.*,
            e.name as name,
            i.id as itinerary_id, i.name as itinerary_name
        FROM t_plugged_in_exercises p
        JOIN t_exercises_olympiad_itinerary as a
        ON p.id = a.exercise
        JOIN t_olympiads o
        ON a.olympiad = o.id
        JOIN t_itineraries i
        ON a.itinerary = i.id
        JOIN t_exercises e
        ON e.id = p.id
        WHERE o.id = $1
        `, [olympiad]
    )

export const getParticipants = (olympiad) =>
    pool.query(
        `
        SELECT
            u.id as username,
            u.password as password
        FROM t_users u
        JOIN t_participants p
        ON p.id = u.id
        JOIN t_itineraries i
        ON i.id = p.itinerary
        JOIN t_olympiads o
        ON o.id = i.olympiad
        WHERE o.id = $1
        `, [olympiad]
    )
