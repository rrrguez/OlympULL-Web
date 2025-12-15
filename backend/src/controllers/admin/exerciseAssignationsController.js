import * as model from "../../models/exerciseAssignationsModel.js";

// GET: obtener todos
export const getAll = async (req, res) => {
  try {
    const result = await model.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: crear nuevo
export const create = async (req, res) => {
  try {
    const data = await model.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
    try {
      const { exercise, olympiad, itinerary } = req.body;
      await model.remove({ exercise, olympiad, itinerary });
      res.json({ message: "Asignación eliminada" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export default {
    getAll,
    create,
    remove
};
