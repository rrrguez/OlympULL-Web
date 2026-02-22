import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import { createAssignation } from "../../../api/organizer/assignationsApi";
//import { getAllExercises, getRubric } from "../../../api/monitor/monitorApi";

export default function NewPunctuationList() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        team: "",
        exercise: "",
        olympiad: "",
        itinerary: "",
        score: null,
    });

    /**
    const [exercises, setExercises] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingExercises, setLoadingExercises] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const exerciseDisabled = loadingExercises || exercises.length === 0;
    const itineraryDisabled = loadingItineraries || itineraries.length === 0;

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if (formData.itinerary) {
            const selected = itineraries.find(
                i => i.itinerary_id === formData.itinerary
            );

            if (selected) {
                setFormData(prev => ({
                    ...prev,
                    olympiad: selected.olympiad_id
                }));
            }
        }
    }, [formData.itinerary, itineraries])

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

        async function loadItineraries(organizer) {
            try {
                setLoadingItineraries(true);

                const res = await getAssignationsItineraries(organizer);

                setItineraries(res.data);
            } catch (err) {
                console.error("Error cargando itinerarios", err);
                toast.error("Error cargando los itinerarios");
            } finally {
                setLoadingItineraries(false);
            }
        }
        loadItineraries(localStorage.getItem("id"))
    }, []);

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
            if (itineraryDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un itinerario"
                }
            }
            await createAssignation(formData);
            navigate("/organizer/assignations");
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
        */

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
