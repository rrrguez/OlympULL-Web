import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRubric } from "../../api/rubricsApi";

export default function NewRubric() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    points: "",
    labels: "",
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
      await createRubric(formData);
      navigate("/admin/rubrics"); // redirige a la lista cuando termine
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la rúbrica");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Crear nueva rúbrica</h1>

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
          <label className="form-label">Puntos</label>
          <input
            type="number"
            name="points"
            className="form-control"
            value={formData.points}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Etiquetas</label>
          <input
            type="timestamp"
            name="labels"
            className="form-control"
            value={formData.labels}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear rúbrica"}
        </button>
      </form>
    </div>
  );
}
