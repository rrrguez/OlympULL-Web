import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUnpluggedExercise } from "../../../api/unpluggedExercisesApi";
import { getAllRubrics } from "../../../api/rubricsApi";
import { toast } from "react-toastify";

export default function NewExercise() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        category: "",
        resources: "",
        rubric: null,
    });

    const [rubrics, setRubrics] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        async function loadRubrics() {
        try {
            const data = await getAllRubrics();
            setRubrics(data.data);
        } catch (err) {
            console.error("Error cargando rúbricas", err);
            toast.error("Error cargando las rúbricas");
        }
        }
        loadRubrics();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // console.log(formData.category);
            await createUnpluggedExercise(formData);
            navigate("/admin/exercises");
            toast.success("Ejercicio creado con éxito");
        } catch (err) {
            console.error("Error completo:", err);
            toast.error(err.response?.data?.error || "Error al crear el ejercicio");
        }
    }

    return (
        <>
        <div className="element-container">
        <form onSubmit={handleSubmit}>
            <div className="element-form">
                <div>
                    <label className="form-label">ID</label>
                    <input
                        type="text"
                        name="id"
                        className="form-control"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
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

                <div>
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

                <div>
                    <label className="form-label">Recursos</label>
                    <input
                        type="text"
                        name="resources"
                        className="form-control"
                        value={formData.resources}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="element-form">
                <div>
                    <label className="form-label">Rúbrica</label>
                    <select
                    name="rubric"
                    className="form-control"
                    value={formData.rubric}
                    onChange={handleChange}
                    required
                    >
                    <option value="">-- Seleccione una rúbrica --</option>
                    {rubrics.map((o) => (
                        <option key={o.id} value={o.id}>
                        {o.id} - {o.name}
                        </option>
                    ))}
                    </select>
                </div>
            </div>

            <div>
            <label className="form-label">Descripción</label>
            <textarea
                name="description"
                className="form-control wide-description-field"
                value={formData.description}
                onChange={handleChange}
            />
            </div>

            <div className="element-form">
                <h1></h1>
                <button className="new-button" disabled={loading}>
                {loading ? "Creando..." : "Crear ejercicio"}
                </button>
            </div>
        </form>
        </div>
        </>
    );
}
