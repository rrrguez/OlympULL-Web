import * as model from "../../models/olympiadsModel.js";

// GET: obtener todas
export const getAll = async (req, res) => {
  try {
    const result = await model.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: obtener una por código
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.getById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Olimpiada no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: crear nueva
export const create = async (req, res) => {
  try {
    const data = await model.create(req.body);
    res.status(201).json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: actualizar
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.update({ id, ...req.body });
    res.json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await model.remove(id);
    res.json({ message: "Eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
};
