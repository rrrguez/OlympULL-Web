import * as model from "../../models/olympiadsModel.js";
import csv from "csv-parser";
import fs from "fs";
import pool from "../db.js";

// GET: obtener todas
export const getAll = async (req, res) => {
  try {
    const result = await model.getAll();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
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
    console.log(err);
    if (err.code === '23505') { // Duplicate key
        if (err.constraint === 't_olympiads_name_key') {
            res.status(400).json({
                error: "Ya existe una olimpiada con el 'Nombre' proporcionado",
                code: err.code
            });
        } else if (err.constraint === 't_olympiads_pkey') {
            res.status(400).json({
                error: "Ya existe una olimpiada con el 'ID' proporcionado",
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
                    if (!o.id || !o.name) {
                        console.warn("Fila inválida: ", o);
                        continue;
                    }
                    /**
                    console.log("INSERTING:", {
                        id: o.id,
                        year: Number(o.year),
                    });
                    */
                    await pool.query(
                        `INSERT INTO t_olympiads (id, name, description, year, start, stop, timezone)
                        VALUES ($1,$2,$3,$4,$5,$6,$7)
                        ON CONFLICT (id) DO UPDATE SET
                            name=EXCLUDED.name,
                            description=EXCLUDED.description,
                            year=EXCLUDED.year,
                            start=EXCLUDED.start,
                            stop=EXCLUDED.stop,
                            timezone=EXCLUDED.timezone`,
                        [
                            o.id,
                            o.name,
                            o.description || null,
                            Number(o.year),
                            o.start,
                            o.stop,
                            o.timezone,
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
    const { rows } = await pool.query("SELECT * FROM t_olympiads");

    let csv = "id,name,description,year,start,stop,timezone\n";

    rows.forEach((o) => {
        csv += `${o.id},${o.name},"${o.description}",${o.year},${o.start},${o.stop},${o.timezone}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=olimpiadas.csv");
    res.send(csv);
};

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    importCsv,
    exportCsv,
};
