import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAssignation } from "../../api/assignationsApi";
import { getAllPluggedInExercises } from "../../api/pluggedInExercisesApi";
import { getUnpluggedExercise } from "../../api/unpluggedExercisesApi";

export default function NewAssignation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exercise: "",
    olympiad: "",
    itinerary: "",
  });

  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    async function loadExercises() {
      try {
        const data = await getAllPluggedInExercises();
        setExercises(data.data);
        const data2 = await getAllPluggedInExercises();
        setExercises(data2.data);
      } catch (err) {
        console.error("Error cargando rúbricas", err);
        setError("No se pudieron cargar las rúbricas");
      }
    }
    loadRubrics();
  }, []);

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
                {assignations.map((o) => (
                    <option key={o.exercise}>
                    {o.exercise}
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
                {assignations.map((o) => (
                    <option key={o.olympiad}>
                    {o.olympiad}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Itinerario</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear asignación"}
        </button>
      </form>
    </div>
  );
}
