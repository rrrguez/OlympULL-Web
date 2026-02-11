import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPluggedInExercise, updatePluggedInExercise } from "../../../api/pluggedInExercisesApi";
import { toast } from "react-toastify";

export default function NewExercise() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        category: "",
        resources: "",
        inputs: null,
        time_limit: null,
        testcase_value: null,
    });

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // console.log(formData.category);
            await updatePluggedInExercise(id, formData);
            navigate("/admin/exercises");
            toast.success("Ejercicio actualizado con éxito");
        } catch (err) {
            console.error("Error completo:", err);
            toast.error(err.response?.data?.error || "Error al actualizar el ejercicio");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getPluggedInExercise(id);
                const o = res.data;

                setFormData({
                    ...o,
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar el ejercicio");
                navigate("/admin/exercises");
            }
        };

        load();
    }, [id]);

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
                        className="form-control read-only-field"
                        value={formData.id}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div>
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
                    <label className="form-label">Número de inputs</label>
                    <input
                        type="number"
                        name="inputs"
                        className="form-control"
                        value={formData.inputs}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label">Límite de tiempo (segundos)</label>
                    <input
                        type="number"
                        name="time_limit"
                        className="form-control"
                        value={formData.time_limit}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label">Puntos por cada testcase superado</label>
                    <input
                        type="number"
                        step="0.01"
                        name="testcase_value"
                        className="form-control"
                        value={formData.testcase_value}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="form-label">Enunciado</label>
                    <input
                        className="form-control file-input"
                        type="file"
                        id="pdf-upload"
                        accept="application/pdf"
                        onChange={handleChange}
                        //required
                    />
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
                {loading ? "Editando..." : "Editar ejercicio"}
                </button>
            </div>
        </form>
        </div>
        </>
    );
}
