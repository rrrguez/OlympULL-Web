import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTeam } from "../../api/teamsApi";
import { getAllSchools } from "../../api/schoolsApi";
import { getAllOlympiads } from "../../api/olympiadsApi";
import { getItineraryByOlympiad } from "../../api/itinerariesApi";
import { toast } from "react-toastify";

export default function NewTeam() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        school: "",
        itinerary: "",
    });

    const [loading, setLoading] = useState(false);

    const [schools, setSchools] = useState([]);
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
        setLoading(true);

        try {
        await createTeam(formData);
        navigate("/admin/teams");
        } catch (err) {
        toast.error(err.response?.data?.error || "Error al crear el equipo");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        async function loadSchools() {
            try {
                const data = await getAllSchools();
                setSchools(data.data);
            } catch (err) {
                console.error("Error cargando las escuelas", err);
                toast.error("Error cargando las escuelas");
            }
        }
        loadSchools();

        async function loadOlympiads() {
            try {
            const data = await getAllOlympiads();
            setOlympiads(data.data);
            } catch (err) {
            console.error("Error cargando las olimpiadas", err);
            toast.error("Error cargando las olimpiadas");
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
        toast.error("Error cargando los itinerarios");
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
                        <select
                            name="school"
                            className="form-control"
                            value={formData.school}
                            onChange={handleChange}
                            required
                            >
                            <option value="">-- Seleccione una escuela --</option>
                            {schools.map((o) => (
                                <option key={o.id} value={o.id}>
                                {o.id} - {o.name}
                                </option>
                            ))}
                        </select>
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
