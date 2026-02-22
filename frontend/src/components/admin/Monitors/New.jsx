import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAssignationsItineraries, getAssignationsOlympiads } from "../../../api/admin/assignationsApi";
import { createMonitor } from "../../../api/admin/monitorsApi";
import { getAllPluggedInExercises } from "../../../api/admin/pluggedInExercisesApi";
import { getAllUnpluggedExercises } from "../../../api/admin/unpluggedExercisesApi";
import { getUserByType } from "../../../api/admin/usersApi";

export default function NewMonitorAssignation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        exercise: "",
        olympiad: "",
        itinerary: "",
    });

    const [loading, setLoading] = useState(false);

    const [monitors, setMonitors] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    const [loadingExercises, setLoadingExercises] = useState(false);
    const [loadingMonitors, setLoadingMonitors] = useState(false);
    const [loadingOlympiads, setLoadingOlympiads] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const monitorDisabled = monitors.length === 0;
    const exerciseDisabled = exercises.length === 0;
    const olympiadDisabled = !formData.exercise || loadingOlympiads || olympiads.length === 0;
    const itineraryDisabled = !formData.olympiad || loadingItineraries || itineraries.length === 0;

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
            if (monitorDisabled)
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un monitor"
                }
            if (exerciseDisabled)
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un ejercicio"
                }
            if (olympiadDisabled || itineraryDisabled)
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una olimpiada y un itinerario"
                }
            await createMonitor(formData);
            navigate("/admin/monitors");
            toast.success("Monitor asignado con éxito")
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            }
            toast.error(err.response?.data?.error || "Error al crear la asignación");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadMonitors() {
            try {
                setLoadingMonitors(true)
                const data = await getUserByType("MONITOR");
                setMonitors(data.data);
            } catch (err) {
                console.error("Error cargando la lista de monitores", err);
                toast.error("Error cargando la lista de monitores")
            } finally {
                setLoadingMonitors(false)
            }
        }
        loadMonitors();

        async function loadExercises() {
            try {
                setLoadingExercises(true)
                const dataPluggedIn = await getAllPluggedInExercises();
                const dataUnplugged = await getAllUnpluggedExercises();
                setExercises([
                    ...dataUnplugged.data,
                    ...dataPluggedIn.data
                ]);
            } catch (err) {
                console.error("Error cargando ejercicios", err);
                toast.error("Error cargando los ejercicios");
            } finally {
                setLoadingExercises(false)
            }
        }
        loadExercises();
    }, [])

    async function loadOlympiads(exercise) {
        try {
            setLoadingOlympiads(true);
            const data = await getAssignationsOlympiads(exercise);
            setOlympiads(data.data);
        } catch (err) {
            console.error("Error cargando las olimpiadas", err);
            toast.error("Error cargando las olimpiadas")
        } finally {
            setLoadingOlympiads(false);
        }
    }

    async function loadItineraries(exercise, olympiad) {
        try {
            setLoadingItineraries(true);
            const res = await getAssignationsItineraries(exercise, olympiad);
            setItineraries(res.data);
        } catch (err) {
            console.error("Error cargando itinerarios", err);
            toast.error("Error cargando los itinerarios")
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
    }, [formData.exercise, formData.olympiad]);

    return (
        <div className="element-container">
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
                            disabled={monitorDisabled}
                            >
                            <option value="">
                                {loadingMonitors
                                    ? "Cargando monitores..."
                                    : monitorDisabled
                                    ? "No hay monitores disponibles"
                                    : "-- Selecciona un monitor --"
                                }
                            </option>
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
                            disabled={exerciseDisabled}
                            >
                            <option value="">
                                {loadingExercises
                                ? "Cargando ejercicios..."
                                : exerciseDisabled
                                ? "No hay ejercicios disponibles"
                                : "-- Selecciona un ejercicio --"
                                }
                            </option>
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
                                : !formData.exercise
                                ? "-- Selecciona primero un ejercicio --"
                                : olympiads.length === 0
                                ? "No hay olimpiadas disponibles"
                                : "-- Selecciona una olimpiada --"}
                            </option>
                            {olympiads.map((o) => (
                                <option key={o.olympiad} value={o.olympiad}>
                                {o.olympiad} - {o.olympiad_name}
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
                                ? "-- Selecciona primero una olimpiada --"
                                : itineraries.length === 0
                                ? "No hay itinerarios disponibles"
                                : "-- Selecciona un itinerario --"}
                            </option>

                            {itineraries.map((i) => (
                                <option key={i.itinerary} value={i.itinerary}>
                                {i.itinerary} - {i.itinerary_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="element-form">
                    <h1></h1>
                    <button className="new-button" disabled={loading}>
                        {loading ? "Creando..." : "Crear asignación"}
                    </button>
                </div>
            </form>
        </div>
    );
}

