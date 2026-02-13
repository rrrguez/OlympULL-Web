import * as model from "../../models/monitorsModel.js";
import csv from "csv-parser";
import fs from "fs";
import pool from "../../db.js";

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
export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await model.getById(id);

        if (result.rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
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
        const { id, exercise, olympiad, itinerary } = req.params;
        await model.remove({id, exercise, olympiad, itinerary});
        res.json({ message: "Eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST: Importar datos desde CSV
export const importCsv = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: "No se ha enviado ningún archivo" });
    }

    //console.log("CSV: ", req.file);

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
                    if (!o.id || !o.exercise || !o.itinerary || !o.olympiad) {
                        console.warn("Fila inválida: ", o);
                        continue;
                    }
                    await pool.query(
                        `INSERT INTO t_monitors (id,exercise,itinerary,olympiad)
                        VALUES ($1,$2,$3,$4)
                        ON CONFLICT (id,exercise,itinerary,olympiad) DO NOTHING`,
                        [
                            o.id,
                            o.exercise,
                            o.itinerary,
                            o.olympiad,
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

export const exportCsv = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM t_monitors");

    let csv = "id,exercise,itinerary,olympiad\n";

    rows.forEach((o) => {
        csv += `${o.id},${o.exercise},${o.itinerary},${o.olympiad}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=monitors.csv");
    res.send(csv);
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    importCsv,
    exportCsv,
};
