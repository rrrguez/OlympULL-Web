import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItinerary } from "../../api/itinerariesApi";
import { getAllOlympiads } from "../../api/olympiadsApi";

export default function NewItinerary() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    olympiad: "",
  });

  const [olympiads, setOlympiads] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createItinerary(formData);
      navigate("/admin/itineraries"); // redirige a la lista cuando termine
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear el itinerario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Crear nuevo itinerario</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-3" style={{ maxWidth: "500px" }}>
      <div className="mb-3">
          <label className="form-label">Código</label>
          <input
            type="text"
            name="id"
            className="form-control"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear itinerario"}
        </button>
      </form>
    </div>
  );
}
