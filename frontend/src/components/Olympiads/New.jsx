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

    const handleStartDateChange = (e) => {
        const value = e.target.value;

        const newFormData = {
            ...formData,
            start: value
        };

        if (!isNaN(e.target.valueAsNumber)) {
            const date = new Date(e.target.valueAsNumber);
            newFormData.year = date.getFullYear();
        } else {
            newFormData.year = "";
        }

        setFormData(newFormData);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
        await createOlympiad(formData);
        navigate("/admin/olympiads");
        } catch (err) {
        setError(err.response?.data?.error || "Error al crear la olimpiada");
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

            <div>
            <label className="form-label">Año</label>
            <input
                type="number"
                name="year"
                className="form-control read-only-field"
                value={formData.year}
                readOnly
            />
            </div>

            <div>
            <label className="form-label">Zona horaria</label>
            <input
                type="text"
                name="timezone"
                className="form-control"
                value={formData.timezone}
                onChange={handleChange}
            />
            </div>

            <div>
            <label className="form-label">Fecha de comienzo</label>
            <input
                type="datetime-local"
                name="start"
                className="form-control"
                value={formData.start}
                onChange={handleStartDateChange}
                required
            />
            </div>

            <div>
            <label className="form-label">Fecha de fin</label>
            <input
                type="datetime-local"
                name="stop"
                className="form-control"
                value={formData.stop}
                onChange={handleChange}
                required
            />
            </div>
            </div>

            <div>
            <label className="form-label">Descripción</label>
            <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
            ></textarea>
            </div>

            <div className="element-form">
                <h1/>
                <button className="new-button" disabled={loading}>
                    {loading ? "Creando..." : "Crear olimpiada"}
                </button>
            </div>
        </form>
        </div>
    );
}
