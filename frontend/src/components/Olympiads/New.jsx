import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOlympiad } from "../../api/olympiadsApi";

export default function NewOlympiad() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    year: "",
    start: "",
    stop: "",
    timezone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createOlympiad(formData);
      navigate("/admin/olympiads"); // redirige a la lista cuando termine
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la olimpiada");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Crear nueva Olimpiada</h1>

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
          <label className="form-label">Año</label>
          <input
            type="number"
            name="year"
            className="form-control"
            value={formData.year}
            onChange={handleChange}
            required
            min="2000"
            max="2100"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de comienzo</label>
          <input
            type="timestamp"
            name="start"
            className="form-control"
            value={formData.start}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de fin</label>
          <input
            type="timestamp"
            name="stop"
            className="form-control"
            value={formData.stop}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Zona horaria</label>
          <input
            type="text"
            name="timezone"
            className="form-control"
            value={formData.timezone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear olimpiada"}
        </button>
      </form>
    </div>
  );
}


