import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAssignation } from "../../../api/assignationsApi";
import { getItineraryByOlympiad } from "../../../api/itinerariesApi";
import { getAllOlympiads } from "../../../api/olympiadsApi";
import { getAllPluggedInExercises } from "../../../api/pluggedInExercisesApi";
import { getAllUnpluggedExercises } from "../../../api/unpluggedExercisesApi";
import { toast } from "react-toastify";

export default function NewAssignation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        exercise: "",
        olympiad: "",
        itinerary: "",
    });

    const [exercises, setExercises] = useState([]);
    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const itineraryDisabled =
    !formData.olympiad || loadingItineraries || itineraries.length === 0;

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
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
                toast.error("Error cargando los ejercicios");
            }
        }
        loadExercises();

        async function loadOlympiads() {
            try {
                const data = await getAllOlympiads();
                setOlympiads(data.data);
            } catch (err) {
                console.error("Error cargando olimpiadas", err);
                toast.error("Error cargando las olimpiadas");
            }
        }
        loadOlympiads();
    }, []);

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

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await createAssignation(formData);
            navigate("/admin/assignations");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al crear la asignación");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="element-container">
                    <div className="element-form">
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
                            {loading ? "Creando..." : "Crear asignación"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
