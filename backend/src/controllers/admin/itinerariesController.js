import csv from "csv-parser";
import fs from "fs";
import pool from "../../db.js";
import * as model from "../../models/itinerariesModel.js";

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
      return res.status(404).json({ message: "Itinerario no encontrado"});
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: obtener uno por olimpiada
export const getByOlympiad = async (req, res) => {
    try {
      const { olympiadId } = req.params;
      const data = await model.getByOlympiad(olympiadId);
      res.json(data.rows);
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
    console.log(err);
    if (err.code === '23505') { // Duplicate key
        if (err.constraint === 't_itineraries_pkey') {
            res.status(400).json({
                error: "Ya existe un itinerario con el 'ID' proporcionado",
                code: err.code
            });
        } else if (err.constraint === 't_itineraries_name_olympiad_key') {
            res.status(400).json({
                error: "Ya existe un itinerario con el 'Nombre' proporcionado en la 'Olimpiada' seleccionada",
                code: err.code
            });
        }
    }
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

// POST: Importar datos desde CSV
export const importCsv = async (req, res) => {
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
                    if (!o.id || !o.name || !o.olympiad) {
                        console.warn("Fila inválida: ", o);
                        continue;
                    }
                    await pool.query(
                        `INSERT INTO t_itineraries (id, name, description, olympiad)
                        VALUES ($1,$2,$3,$4)
                        ON CONFLICT (id) DO UPDATE SET
                            name=EXCLUDED.name,
                            description=EXCLUDED.description,
                            olympiad=EXCLUDED.olympiad`,
                        [
                            o.id,
                            o.name,
                            o.description || "",
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
    const { rows } = await pool.query("SELECT * FROM t_itineraries");

    let csv = "id,name,description,olympiad\n";

    rows.forEach((o) => {
        csv += `${o.id},${o.name},"${o.description}",${o.olympiad}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=itineraries.csv");
    res.send(csv);
};

export default {
    getAll,
    getOne,
    getByOlympiad,
    create,
    update,
    remove,
    importCsv,
    exportCsv,
};
