import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAssignation } from "../../../api/assignationsApi";
import { getItineraryByOlympiad } from "../../../api/itinerariesApi";
import { getAllOlympiads } from "../../../api/olympiadsApi";
import { getAllPluggedInExercises } from "../../../api/pluggedInExercisesApi";
import { getAllUnpluggedExercises } from "../../../api/unpluggedExercisesApi";

export default function NewExerciseAssignation() {
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

    const [loadingExercises, setLoadingExercises] = useState(false);
    const [loadingOlympiads, setLoadingOlympiads] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const exerciseDisabled = loadingExercises || olympiads.length === 0;
    const olympiadDisabled = loadingOlympiads || olympiads.length === 0;
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

        async function loadOlympiads() {
            try {
                setLoadingOlympiads(true)
                const data = await getAllOlympiads();
                setOlympiads(data.data);
            } catch (err) {
                console.error("Error cargando olimpiadas", err);
                toast.error("Error cargando las olimpiadas");
            } finally {
                setLoadingOlympiads(false)
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
            if (exerciseDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un ejercicio"
                }
            }
            if (olympiadDisabled || itineraryDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una olimpiada y un itinerario"
                }
            }
            await createAssignation(formData);
            navigate("/admin/assignations");
            toast.success("Ejercicio '" + formData.exercise + "' asignado con éxito al itinerario '" + formData.itinerary + "'")
        } catch (err) {
            if (err.type === "warn") {
                toast.warning(err.message);
                return
            }
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
                                disabled={exerciseDisabled}
                                >
                                    <option value="">
                                        {loadingExercises ? "Cargando ejercicios" : exerciseDisabled ?
                                            "No hay ejercicios disponibles" : "-- Selecciona un ejercicio --"
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
                                onChange={handleChange}
                                required
                                disabled={olympiadDisabled}
                                >
                                    <option value="">
                                        {loadingOlympiads ? "Cargando olimpiadas" : olympiads.length > 0 ?
                                            "-- Selecciona una olimpiada --" :
                                            "No hay olimpiadas disponibles"
                                        }
                                    </option>

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
                                    ? "-- Selecciona primero una olimpiada --"
                                    : itineraries.length === 0
                                    ? "No hay itinerarios disponibles"
                                    : "-- Selecciona un itinerario --"}
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
