import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUnpluggedExercise } from "../../api/unpluggedExercisesApi";
import { createPluggedInExercise } from "../../api/pluggedInExercisesApi";

export default function NewExercise() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    resources: "",
    type: "",
    rubric: "",
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
        console.log(formData.category);
        if(formData.type === "DESENCHUFADO") {
            await createUnpluggedExercise(formData);
            navigate("/admin/exercises");
        } else {
        console.log("prueba")
            await createPluggedInExercise(formData);
            navigate("/admin/exercises");
        }

    } catch (err) {
        if (err.response) {
          console.error("⚠️ Error del servidor:", err.response.data);
        } else if (err.request) {
          console.error("❌ No hubo respuesta del servidor:", err.request);
        } else {
          console.error("🚫 Error en la configuración de la petición:", err.message);
        }

        console.error("🔍 Error completo:", err);
        setError(err.response?.data?.error || "Error al crear el ejercicio");
        
      }
  }

  return (
    <div className="container mt-4">
      <h1>Nuevo ejercicio</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>

        {/* Tipo de ejercicio */}
        <div className="mb-3">
          <label className="form-label">Tipo de ejercicio</label>
          <select
            name="type"
            className="form-control"
            value={formData.type}
            onChange={handleChange}
            required
            id="ex_type"
          >
            <option value="">-- Seleccionar --</option>
            <option value="ENCHUFADO">Enchufado</option>
            <option value="DESENCHUFADO">Desenchufado</option>
          </select>
        </div>

        {/* Campos comunes */}
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
            id="category"
          >
            <option value="">-- Seleccionar --</option>
            <option value="ABSTRACTION">Abstracción</option>
            <option value="ALGORITHMS">Algoritmos</option>
            <option value="LOOPS">Bucles</option>
            <option value="CONDITIONALS">Condicionales</option>
            <option value="COMPOSITION">Composición</option>
            <option value="FUNCTIONS">Funciones</option>
            <option value="AI">Inteligencia artificial</option>
            <option value="PATTERNS RECOGNITION">Reconocimiento de patrones</option>
            <option value="SEQUENCES">Secuencias</option>
            <option value="LOOPS AND SEQUENCES">Secuencias y bucles</option>
            <option value="VARIABLES">Variables</option>
            <option value="VARIABLES AND FUNCTIONS">Variables y funciones</option>
            <option value="OTHER">Otro</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Recursos</label>
          <input
            type="text"
            name="resources"
            className="form-control"
            value={formData.resources}
            onChange={handleChange}
          />
        </div>

        {/* Si es DESENCHUFADO → mostrar RÚBRICA */}
        {formData.type === "DESENCHUFADO" && (
          <div className="mb-3">
            <label className="form-label">Rúbrica</label>
            <input
              type="text"
              name="rubric"
              className="form-control"
              value={formData.rubric}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Si es ENCHUFADO → mostrar Inputs, Time Limit, Testcase Value */}
        {formData.type === "ENCHUFADO" && (
          <>
            <div className="mb-3">
              <label className="form-label">Número de inputs</label>
              <input
                type="number"
                name="inputs"
                className="form-control"
                value={formData.inputs}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Límite de tiempo (segundos)</label>
              <input
                type="number"
                name="time_limit"
                className="form-control"
                value={formData.time_limit}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Valor de testcases</label>
              <input
                type="number"
                step="0.01"
                name="testcase_value"
                className="form-control"
                value={formData.testcase_value}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creando..." : "Crear ejercicio"}
        </button>
      </form>
    </div>
  );
}
