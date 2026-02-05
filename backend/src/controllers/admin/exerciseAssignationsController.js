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

export const getOlympiads = async (req, res) => {
    try {
        const { exercise } = req.params;
        const result = await model.getOlympiads(exercise);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getItineraries = async (req, res) => {
    try {
        const { exercise, olympiad } = req.params;
        const result = await model.getItineraries(exercise, olympiad);
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
                    if (!o.exercise || !o.olympiad || !o.itinerary) {
                        console.warn("Fila inválida: ", o);
                        continue;
                    }
                    await pool.query(
                        `INSERT INTO t_exercises_olympiad_itinerary (exercise, olympiad, itinerary)
                        VALUES ($1,$2,$3)
                        ON CONFLICT (exercise, olympiad, itinerary) DO UPDATE SET
                            exercise=EXCLUDED.exercise,
                            olympiad=EXCLUDED.olympiad,
                            itinerary=EXCLUDED.itinerary`,
                        [
                            o.exercise,
                            o.olympiad,
                            o.itinerary,
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
    const { rows } = await pool.query("SELECT * FROM t_exercises_olympiad_itinerary");

    let csv = "exercise,olympiad,itinerary\n";

    rows.forEach((o) => {
        csv += `${o.exercise},"${o.olympiad}","${o.itinerary}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=exercises-olympiads-itineraries.csv");
    res.send(csv);
};

export default {
    getAll,
    getOlympiads,
    getItineraries,
    create,
    remove,
    importCsv,
    exportCsv
};
