import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSchool } from "../../api/schoolsApi";

export default function NewRubric() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
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
        await createSchool(formData);
        navigate("/admin/schools");
        } catch (err) {
        setError(err.response?.data?.error || "Error al crear la escuela");
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="element-container">
            {error && <div className="alert alert-danger">{error}</div>}

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
                </div>

                <div className="element-form">
                    <h1></h1>
                    <button className="new-button" disabled={loading}>
                        {loading ? "Creando..." : "Crear escuela"}
                    </button>
                </div>
            </form>
        </div>
    );
}
