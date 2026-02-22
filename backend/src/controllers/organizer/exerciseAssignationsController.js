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
        const result = await model.getItinerariesForOrganizer({organizer});
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
