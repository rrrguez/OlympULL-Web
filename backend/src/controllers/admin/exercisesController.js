import pool from "../db.js";
import csv from "csv-parser";
import fs from "fs";
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
        console.log(err);
        if (err.code === '23505') { // Duplicate key
            if (err.constraint === 't_exercises_pkey') {
                res.status(400).json({
                    error: "Ya existe un ejercicio con el 'ID' proporcionado",
                    code: err.code
                });
            }
        }
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
    await model.removeUnplugged(id);
    res.json({ message: "Eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Importar datos desde CSV
export const importUnpluggedCsv = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: "No se ha enviado ningún archivo" });
    }

    // console.log("CSV: ", req.file);

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => {
            console.log(data);
            results.push(data);
        })
        .on("end", async () => {
            const client = await pool.connect();
            try {
                await client.query("BEGIN");
                for (const o of results) {
                    if (!o.id || !o.name || !o.category || !o.resources || !o.rubric) {
                        console.warn("Fila inválida: ", o);
                        continue;
                    }
                    await pool.query(
                        `INSERT INTO t_exercises (id,name,description, category,resources)
                        VALUES ($1,$2,$3,$4,$5)
                        ON CONFLICT (id) DO UPDATE SET
                            name=EXCLUDED.name,
                            description=EXCLUDED.description,
                            category=EXCLUDED.category,
                            resources=EXCLUDED.resources`,
                        [
                            o.id,
                            o.name,
                            o.description || null,
                            o.category,
                            o.resources,
                        ]
                    );
                    await pool.query(
                        `INSERT INTO t_unplugged_exercises (id, rubric)
                        VALUES ($1,$2)
                        ON CONFLICT (id) DO UPDATE SET
                            rubric=EXCLUDED.rubric`,
                        [
                            o.id,
                            o.rubric
                        ]
                    );
                }

                await client.query("COMMIT");

                res.json({ imported: results.length });
            } catch (err) {
                res.status(500).json({ error: "Error procesando el CSV" });
            } finally {
                client.release();
                fs.unlink(req.file.path, () => {});
            }
      });
  };

export const exportUnpluggedCsv = async (req, res) => {
    const { rows } = await pool.query("SELECT e.*, u.* FROM T_EXERCISES e JOIN T_UNPLUGGED_EXERCISES u ON e.id = u.id");

    let csv = "id,name,description,category,resources,rubric\n";

    rows.forEach((o) => {
        csv += `${o.id},"${o.name}","${o.description}",${o.category},${o.resources},${o.rubric}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=exercises-olympiads-itineraries.csv");
    res.send(csv);
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
        const wordingFile = req.file ? req.file.filename : null;

        const data = await model.createPluggedIn({
            ...req.body,
            wording_file: wordingFile
    });
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        if (err.code === '23505') { // Duplicate key
            if (err.constraint === 't_exercises_pkey') {
                res.status(400).json({
                    error: "Ya existe un ejercicio con el 'ID' proporcionado",
                    code: err.code
                });
            } else if (err.constraint === 't_plugged_in_exercises_pkey') {
                res.status(400).json({
                    error: "Ya existe un ejercicio enchufado con el 'ID' proporcionado",
                    code: err.code
                });
            }
        }
        res.status(500).json({ error: err.message });
    }
};

// PUT: actualizar
export const updatePluggedIn = async (req, res) => {
    try {
        const { id } = req.params;

        const wordingFile = req.file
            ? req.file.filename
            : req.body.wording_file || null;

        const data = await model.updatePluggedIn({
            id,
            ...req.body,
            wording_file: wordingFile
        });

        res.json(data.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const removePluggedIn = async (req, res) => {
    try {
    const { id } = req.params;
    await model.removePluggedIn(id);
    res.json({ message: "Eliminado correctamente" });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// POST: Importar datos desde CSV
export const importPluggedInCsv = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: "No se ha enviado ningún archivo" });
    }

    // console.log("CSV: ", req.file);

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => {
            console.log(data);
            results.push(data);
        })
        .on("end", async () => {
            const client = await pool.connect();
            try {
                await client.query("BEGIN");
                for (const o of results) {
                    if (!o.id || !o.name || !o.category || !o.resources || !o.inputs || !o.testcase_value) {
                        console.warn("Fila inválida: ", o);
                        continue;
                    }
                    await pool.query(
                        `INSERT INTO t_exercises (id,name,description, category,resources)
                        VALUES ($1,$2,$3,$4,$5)
                        ON CONFLICT (id) DO UPDATE SET
                            name=EXCLUDED.name,
                            description=EXCLUDED.description,
                            category=EXCLUDED.category,
                            resources=EXCLUDED.resources`,
                        [
                            o.id,
                            o.name,
                            o.description || null,
                            o.category,
                            o.resources,
                        ]
                    );
                    await pool.query(
                        `INSERT INTO t_plugged_in_exercises (id,inputs,time_limit,testcase_value)
                        VALUES ($1,$2,$3,$4)
                        ON CONFLICT (id) DO UPDATE SET
                            inputs=EXCLUDED.inputs,
                            time_limit=EXCLUDED.time_limit,
                            testcase_value=EXCLUDED.testcase_value`,
                        [
                            o.id,
                            Number(o.inputs),
                            Number(o.time_limit) || null,
                            Number(o.testcase_value)
                        ]
                    );
                }

                await client.query("COMMIT");

                res.json({ imported: results.length });
            } catch (err) {
                res.status(500).json({ error: "Error procesando el CSV" });
            } finally {
                client.release();
                fs.unlink(req.file.path, () => {});
            }
      });
  };

export const exportPluggedInCsv = async (req, res) => {
    const { rows } = await pool.query("SELECT e.*, u.* FROM T_EXERCISES e JOIN T_PLUGGED_IN_EXERCISES u ON e.id = u.id");

    let csv = "id,name,description,category,resources,inputs,time_limit,testcase_value\n";

    rows.forEach((o) => {
        csv += `${o.id},${o.name},"${o.description}",${o.category},${o.resources},${o.inputs},${o.time_limit},${o.testcase_value}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=exercises-olympiads-itineraries.csv");
    res.send(csv);
};

export default {
    // DESENCHUFADOS
    getAllUnplugged,
    getOneUnplugged,
    createUnplugged,
    updateUnplugged,
    removeUnplugged,
    importUnpluggedCsv,
    exportUnpluggedCsv,

    // ENCHUFADOS
    getAllPluggedIn,
    getOnePluggedIn,
    createPluggedIn,
    updatePluggedIn,
    removePluggedIn,
    importPluggedInCsv,
    exportPluggedInCsv,
};
