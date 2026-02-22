import * as model from "../../models/exerciseAssignationsModel.js";

export const getAll = async (req, res) => {
    try {
        const { organizer } = req.params;
        const result = await model.getAllForOrganizer(organizer);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getItineraries = async (req, res) => {
    try {
        const { organizer } = req.params;
        const result = await model.getItinerariesForOrganizer(organizer);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// POST: crear nuevo
export const create = async (req, res) => {
    try {
        const data = await model.create(req.body);
        res.status(201).json(data.rows[0]);
    } catch (err) {
        console.log(err);
        if (err.code === '23505') { // Duplicate key
            if (err.constraint === 't_exercises_olympiad_itinerary_pkey') {
                res.status(400).json({
                    error: "El 'Ejercicio' seleccionado ya forma parte de ese 'Itinerario' en la 'Olimpiada' elegida",
                    code: err.code
                });
            }
        }
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const remove = async (req, res) => {
    try {
        const { exercise, olympiad, itinerary } = req.params;
        await model.remove({ exercise, olympiad, itinerary });
        res.json({ message: "Asignación eliminada" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    getAll,
    getItineraries,
    create,
    remove
}
