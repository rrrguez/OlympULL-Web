import * as model from "../../models/exercisesModel.js";

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

// GET: obtener uno por código
export const getOneUnplugged = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.getUnpluggedByid(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: crear nuevo
export const createUnplugged = async (req, res) => {
  try {
    const data = await model.createUnplugged(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: actualizar
export const updateUnplugged = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.updateUnplugged({ id, ...req.body });
    res.json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const removeUnplugged = async (req, res) => {
  try {
    const { id } = req.params;
    await model.deleteUnplugged(id);
    res.json({ message: "Eliminado correctamente" });
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

  // GET: obtener uno por código
  export const getOnePluggedIn = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await model.getPluggedInByid(id);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Ejercicio no encontrado" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // POST: crear nuevo
  export const createPluggedIn = async (req, res) => {
    try {
      const data = await model.createPluggedIn(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // PUT: actualizar
  export const updatePluggedIn = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await model.updatePluggedIn({ id, ...req.body });
      res.json(data.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // DELETE
  export const removePluggedIn = async (req, res) => {
    try {
      const { id } = req.params;
      await model.deletePluggedIn(id);
      res.json({ message: "Eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export default {
    // DESENCHUFADOS
    getAllUnplugged,
    getOneUnplugged,
    createUnplugged,
    updateUnplugged,
    removeUnplugged,

    // ENCHUFADOS
    getAllPluggedIn,
    getOnePluggedIn,
    createPluggedIn,
    updatePluggedIn,
    removePluggedIn,
};
