import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAssignation } from "../../api/assignationsApi";
import { getItineraryByOlympiad } from "../../api/itinerariesApi";
import { getAllOlympiads } from "../../api/olympiadsApi";
import { getAllPluggedInExercises } from "../../api/pluggedInExercisesApi";
import { getAllUnpluggedExercises } from "../../api/unpluggedExercisesApi";

export default function NewAssignation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exercise: "",
    olympiad: "",
    itinerary: "",
  });

  const [exercises, setExercises] = useState([]);
  const [olympiads, setOlympiads] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loadingItineraries, setLoadingItineraries] = useState(false);

  const itineraryDisabled =
  !formData.olympiad || loadingItineraries || itineraries.length === 0;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    async function loadExercises() {
      try {
        const dataPluggedIn = await getAllPluggedInExercises();
        const dataUnplugged = await getAllUnpluggedExercises();
        setExercises([
            ...dataUnplugged.data,
            ...dataPluggedIn.data
          ]);
      } catch (err) {
        console.error("Error cargando ejercicios", err);
        setError("No se pudieron cargar los ejercicios");
      }
    }
    loadExercises();

    async function loadOlympiads() {
        try {
          const data = await getAllOlympiads();
          setOlympiads(data.data);
        } catch (err) {
          console.error("Error cargando olimpiadas", err);
          setError("No se pudieron cargar las olimpiadas");
        }
      }
      loadOlympiads();
  }, []);

  async function loadItineraries(olympiadId) {
    try {
      setLoadingItineraries(true);

      const res = await getItineraryByOlympiad(olympiadId);

      setItineraries(res.data);
    } catch (err) {
      console.error("Error cargando itinerarios", err);
      setError("No se pudieron cargar los itinerarios");
    } finally {
      setLoadingItineraries(false);
    }
  }

  useEffect(() => {
    if (formData.olympiad) {
      loadItineraries(formData.olympiad);
      setFormData(prev => ({ ...prev, itinerary: "" }));
    } else {
      setItineraries([]);
    }
  }, [formData.olympiad]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createAssignation(formData);
      navigate("/admin/assignations"); // redirige a la lista cuando termine
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la asignación");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Crear nueva asignación</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-3" style={{ maxWidth: "500px" }}>
      <div className="mb-3">
          <label className="form-label">Ejercicio</label>
          <select
                name="exercise"
                className="form-control"
                value={formData.exercise}
                onChange={handleChange}
                required
                >
                <option value="">-- Seleccione un ejercicio --</option>
                {exercises.map((o) => (
                    <option key={o.id} value={o.id}>
                    {o.id} - {o.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Olimpiada</label>
          <select
                name="olympiad"
                className="form-control"
                value={formData.olympiad}
                onChange={handleChange}
                required
                >
                <option value="">-- Seleccione una olimpiada --</option>
                {olympiads.map((o) => (
                    <option key={o.id} value={o.id}>
                    {o.id} - {o.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Itinerario</label>
          <select
            name="itinerary"
            className="form-control"
            value={formData.itinerary}
            onChange={handleChange}
            disabled={itineraryDisabled}
            required
            >
            <option value="">
                {loadingItineraries
                ? "Cargando itinerarios..."
                : !formData.olympiad
                ? "-- Seleccione primero una olimpiada --"
                : itineraries.length === 0
                ? "No hay itinerarios disponibles"
                : "-- Seleccione un itinerario --"}
            </option>

            {itineraries.map((i) => (
                <option key={i.id} value={i.id}>
                {i.id} - {i.name}
                </option>
            ))}
            </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear asignación"}
        </button>
      </form>
    </div>
  );
}
