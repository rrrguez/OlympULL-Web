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
            console.error("Error cargando itinerarios", err);
            setError("No se pudieron cargar las itinerarios");
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
        navigate("/admin/itineraries");
        } catch (err) {
        setError(err.response?.data?.error || "Error al crear el itinerario");
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
                <h1/>
                <button type="submit" className="new-button" disabled={loading}>
                {loading ? "Creando..." : "Crear itinerario"}
                </button>
            </div>
        </form>
        </div>
    );
}
