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

    const [loading, setLoading] = useState(false);

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
        await createRubric(formData);
        navigate("/admin/rubrics");
        } catch (err) {
        toast.error(err.response?.data?.error || "Error al crear la rúbrica");
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="element-container">
            <form onSubmit={handleSubmit}>
                <div className="element-form">
                    <div>
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
                        <label className="form-label">Puntos</label>
                        <input
                            type="string"
                            name="points"
                            className="form-control"
                            value={formData.points}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Etiquetas</label>
                        <input
                            type="timestamp"
                            name="labels"
                            className="form-control"
                            value={formData.labels}
                            onChange={handleChange}
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
                    ></textarea>
                </div>

                <div className="element-form">
                    <h1></h1>
                    <button className="new-button" disabled={loading}>
                        {loading ? "Creando..." : "Crear rúbrica"}
                    </button>
                </div>
            </form>
        </div>
    );
}
