import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByType } from "../../api/usersApi";
import { getAssignationsOlympiads } from "../../api/assignationsApi";
import { getAssignationsItineraries } from "../../api/assignationsApi";
import { getAllPluggedInExercises } from "../../api/pluggedInExercisesApi";
import { getAllUnpluggedExercises } from "../../api/unpluggedExercisesApi";
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

    const [monitors, setMonitors] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    const [loadingOlympiads, setLoadingOlympiads] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const olympiadDisabled =
    !formData.exercise || loadingOlympiads || olympiads.length === 0;
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
        await createMonitor(formData);
        navigate("/admin/teams");
        } catch (err) {
        setError(err.response?.data?.error || "Error al crear la asignación");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        async function loadMonitors() {
            try {
                const data = await getUserByType("MONITOR");
                setMonitors(data.data);
            } catch (err) {
                console.error("Error cargando la lista de monitores", err);
            }
        }
        loadMonitors();

        async function loadExercises() {
            try {
                const dataPluggedIn = await getAllPluggedInExercises();
                const dataUnplugged = await getAllUnpluggedExercises();
                setExercises([
                    ...dataUnplugged.data,
                    ...dataPluggedIn.data
                ]);
            } catch (err) {
                console.error("Error cargando ejercicios", err);
                setError("No se pudieron cargar los ejercicios");
            }
            }
        loadExercises();
    })

    async function loadOlympiads(exercise) {
        try {
            setLoadingOlympiads(true);
            const data = await getAssignationsOlympiads(exercise);
            setOlympiads(data.data);
        } catch (err) {
            console.error("Error cargando olimpiadas", err);
        } finally {
            setLoadingOlympiads(false);
        }
    }

    async function loadItineraries(exercise, olympiadId) {
        try {
            setLoadingItineraries(true);
            const res = await getAssignationsItineraries(exercise, olympiadId);
            setItineraries(res.data);
        } catch (err) {
            console.error("Error cargando itinerarios", err);
        } finally {
            setLoadingItineraries(false);
        }
    }

    useEffect(() => {
        if (!formData.exercise) {
            setOlympiads([]);
            return;
        }

        loadOlympiads(formData.exercise);
        setFormData(prev => ({
            ...prev,
            olympiad: "",
            itinerary: ""
        }));
    }, [formData.exercise]);

    useEffect(() => {
        if (!formData.olympiad) {
            setItineraries([]);
            return;
        }

        loadItineraries(formData.exercise, formData.olympiad);
        setFormData(prev => ({ ...prev, itinerary: "" }));
    }, [formData.olympiad]);

    return (
        <div className="element-container">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="element-form">
                    <div>
                        <label className="form-label">Monitor</label>
                        <select
                            name="id"
                            className="form-control"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            >
                            <option value="">-- Seleccione un monitor --</option>
                            {monitors.map((o) => (
                                <option key={o.id} value={o.id}>
                                {o.id} - {o.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Ejercicio</label>
                        <select
                            name="exercise"
                            className="form-control"
                            value={formData.exercise}
                            onChange={handleChange}
                            required
                            >
                            <option value="">-- Seleccione un ejercicio --</option>
                            {exercises.map((o) => (
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
                            disabled={olympiadDisabled}
                            onChange={handleChange}
                            required
                            >
                            <option value="">
                                {loadingOlympiads
                                ? "Cargando olimpiadas..."
                                : !formData.olympiad
                                ? "-- Seleccione primero un ejercicio --"
                                : olympiads.length === 0
                                ? "No hay olimpiadas disponibles"
                                : "-- Seleccione una olimpiada --"}
                            </option>
                            {olympiads.map((o) => (
                                <option key={o.olympiad} value={o.olympiad}>
                                {o.olympiad}
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
                                <option key={i.itinerary} value={i.itinerary}>
                                {i.itinerary}
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

