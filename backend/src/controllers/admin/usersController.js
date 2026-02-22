import csv from "csv-parser";
import fs from "fs";
import pool from "../../db.js";
import * as model from "../../models/usersModel.js";

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

// GET: obtener una por código
export const getByType = async (req, res) => {
    try {
        const { type } = req.params;
        const result = await model.getByType(type);
        res.json(result.rows);
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
            if (err.constraint === 't_users_pkey') {
                res.status(400).json({
                    error: "Ya existe un usuario con el 'Usuario' proporcionado",
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

// PUT: actualizar
export const updatePassword = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await model.updatePassword({ id, ...req.body });
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
                    if (!o.id || !o.username || !o.password || !o.type) {
                        console.warn("Fila inválida: ", o);
                        continue;
                    }
                    await pool.query(
                        `INSERT INTO t_users (id, username, password, type)
                        VALUES ($1,$2,$3,$4)
                        ON CONFLICT (id) DO UPDATE SET
                            username=EXCLUDED.username,
                            password=EXCLUDED.password,
                            type=EXCLUDED.type`,
                        [
                            o.id,
                            o.username,
                            o.password,
                            o.type,
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
    const { rows } = await pool.query("SELECT * FROM t_users");

    let csv = "id,username,password,type\n";

    rows.forEach((o) => {
        csv += `${o.id},${o.username},${o.password},${o.type}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");
    res.send(csv);
};

export default {
    getAll,
    getById,
    getByType,
    create,
    update,
    updatePassword,
    remove,
    importCsv,
    exportCsv,
};
