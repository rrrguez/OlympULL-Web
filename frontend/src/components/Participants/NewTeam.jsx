import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTeam } from "../../api/teamsApi";

export default function NewRubric() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [schools, setSchools] = useState([]);
    const [itineraries, setItineraries] = useState([]);

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
        await createTeam(formData);
        navigate("/admin/teams");
        } catch (err) {
        setError(err.response?.data?.error || "Error al crear el equipo");
        } finally {
        setLoading(false);
        }
    }

    async function loadItineraries(olympiadId) {
        try {
        setLoadingItineraries(true);

        const res = await getItineraryByOlympiad(olympiadId);

        setItineraries(res.data);
        } catch (err) {
        console.error("Error cargando itinerarios", err);
        setError("No se pudieron cargar los itinerarios");
        } finally {
        setLoadingItineraries(false);
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
                        <label className="form-label">Escuela</label>
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
                            type="text"
                            name="olympiad"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Itinerario</label>
                        <select
                            type="text"
                            name="itineary"
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
                        {loading ? "Creando..." : "Crear equipo"}
                    </button>
                </div>
            </form>
        </div>
    );
}
