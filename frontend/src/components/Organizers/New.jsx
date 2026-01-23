import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByType } from "../../api/usersApi";
import { getAllOlympiads } from "../../api/olympiadsApi";
import { getItineraryByOlympiad } from "../../api/itinerariesApi";

export default function NewTeam() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        exercise: "",
        olympiad: "",
        itinerary: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [organizers, setOrganizers] = useState([]);

    const [exercises, setExercises] = useState([]);
    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const itineraryDisabled =
    !formData.olympiad || loadingItineraries || itineraries.length === 0;

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
        await createOrganizer(formData);
        navigate("/admin/teams");
        } catch (err) {
        setError(err.response?.data?.error || "Error al crear la asignación");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        async function loadOrganizers() {
            try {
                const data = await getUserByType("ORGANIZER");
                setOrganizers(data.data);
            } catch (err) {
                console.error("Error cargando la lista de organizeres", err);
            }
        }
        loadOrganizers();
        async function loadOlympiads() {
            try {
            const data = await getAllOlympiads();
            setOlympiads(data.data);
            } catch (err) {
            console.error("Error cargando olimpiadas", err);
            }
        }
        loadOlympiads();
    })

    async function loadItineraries(olympiadId) {
        try {
        setLoadingItineraries(true);

        const res = await getItineraryByOlympiad(olympiadId);

        setItineraries(res.data);
        } catch (err) {
        console.error("Error cargando itinerarios", err);
        } finally {
        setLoadingItineraries(false);
        }
    }

    useEffect(() => {
        if (formData.olympiad) {
        loadItineraries(formData.olympiad);
        setFormData(prev => ({ ...prev, itinerary: "" }));
        } else {
        setItineraries([]);
        }
    }, [formData.olympiad]);

    return (
        <div className="element-container">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="element-form">
                    <div>
                        <label className="form-label">Organizer</label>
                        <select
                            name="organizer"
                            className="form-control"
                            value={formData.school}
                            onChange={handleChange}
                            required
                            >
                            <option value="">-- Seleccione un organizer --</option>
                            {organizers.map((o) => (
                                <option key={o.id} value={o.id}>
                                {o.id} - {o.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Ejercicio</label>
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
                    <div>
                        <label className="form-label">Itinerario</label>
                        <select
                            name="itinerary"
                            className="form-control"
                            value={formData.itinerary}
                            onChange={handleChange}
                            disabled={itineraryDisabled}
                            required
                        >
                            <option value="">
                                {loadingItineraries
                                ? "Cargando itinerarios..."
                                : !formData.olympiad
                                ? "-- Seleccione primero una olimpiada --"
                                : itineraries.length === 0
                                ? "No hay itinerarios disponibles"
                                : "-- Seleccione un itinerario --"}
                            </option>

                            {itineraries.map((i) => (
                                <option key={i.id} value={i.id}>
                                {i.id} - {i.name}
                                </option>
                            ))}
                        </select>
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

