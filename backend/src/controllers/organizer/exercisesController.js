import * as model from "../../models/exercisesModel.js";
import { getAll } from "./exerciseAssignationsController.js";

// DESENCHUFADOS
// GET: obtener todos
export const getAllUnplugged = async (req, res) => {
    try {
      const result = await model.getAllUnplugged();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// ENCHUFADOS
// GET: obtener todos
export const getAllPluggedIn = async (req, res) => {
    try {
    const result = await model.getAllPluggedIn();
    res.json(result.rows);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

export default {
    getAllUnplugged,
    getAllPluggedIn
}
