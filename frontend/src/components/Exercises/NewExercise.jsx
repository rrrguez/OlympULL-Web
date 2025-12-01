import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { createUnpluggedExercise, createPluggedInExercise } from "../../api/exercisesApi";

export default function NewExercise() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    resources: "",
    // Campos propios de desenchufados
    rubric: "",
    // Campos propios de enchufados
    inputs: "",
    time_limit: "",
    testcase_value: "",
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
      navigate("/admin/exercises"); // redirige a la lista cuando termine
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear el ejercicio");
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
          <label className="form-label">Tipo de ejercicio</label>
          <input
            type="combo"
            name="type"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
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
          <label className="form-label">Título</label>
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
          <label className="form-label">Categoría</label>
          <input
            type="combo"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Recursos</label>
          <input
            type="string"
            name="resources"
            className="form-control"
            value={formData.resources}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rúbrica</label>
          <input
            type="string"
            name="rubric"
            className="form-control"
            value={formData.rubric}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Número de inputs</label>
          <input
            type="text"
            name="inputs"
            className="form-control"
            value={formData.inputs}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Límite de tiempo (segundos) </label>
          <input
            type="int"
            name="time_limit"
            className="form-control"
            value={formData.time_limit}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label"> Valor de los testcases </label>
          <input
            type="decimal"
            name="testcase_value"
            className="form-control"
            value={formData.testcase_value}
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
