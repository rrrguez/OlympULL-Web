import * as model from "../../models/exercisesModel.js";

// GET: obtener todos
export const getAll = async (req, res) => {
  try {
    const result = await model.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: obtener uno por código
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.getByid(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: crear nuevo
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
    await model.delete(id);
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
