import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllExercises, getAllTeams, getRubric, punctuateTeam } from "../../../api/monitor/monitorApi";

export default function NewPunctuationList() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        team: "",
        exercise: "",
        itinerary: "",
        score: "",
    });

    const [teams, setTeams] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingTeams, setLoadingTeams] = useState(false);
    const [loadingExercises, setLoadingExercises] = useState(false);
    const [loadingScores, setLoadingScores] = useState(false);

    const teamDisabled = !formData.exercise || loadingTeams || teams.length === 0;
    const exerciseDisabled = loadingExercises || exercises.length === 0;
    const scoreDisabled = !formData.exercise || loadingScores || scores.length === 0;

    useEffect(() => {
        async function loadExercises(monitor) {
            try {
                setLoadingExercises(true)
                const res = await getAllExercises(monitor);
                setExercises(res.data);
            } catch (err) {
                console.error("Error cargando los ejercicios", err);
                toast.error("Error cargando los ejercicios");
            } finally {
                setLoadingExercises(false)
            }
        }
        loadExercises(localStorage.getItem("id"));
    }, [])

    useEffect(() => {
        if (!formData.exercise) {
            setTeams([]);
            setScores([]);

            setFormData(prev => ({
                ...prev,
                team: "",
                score: ""
            }));

            return;
        }

        const selected = exercises.find(
            i => i.exercise_id === formData.exercise
        );

        if (!selected) return;

        const itineraryId = selected.itinerary_id;

        setFormData(prev => ({
            ...prev,
            itinerary: itineraryId
        }));

        async function loadData() {
            try {
                setLoadingTeams(true);
                setLoadingScores(true);

                const [teamsRes, rubricRes] = await Promise.all([
                    getAllTeams(itineraryId),
                    getRubric(selected.exercise_id)
                ]);

                setTeams(teamsRes.data);

                const pointsArray = rubricRes.data[0].points.split(",").map(p => p.trim());
                const labelsArray = rubricRes.data[0].labels.split(",").map(l => l.trim());

                setScores(
                    pointsArray.map((point, index) => ({
                        value: point,
                        label: labelsArray[index] || ""
                    }))
                );

            } catch (err) {
                toast.error("Error cargando datos");
            } finally {
                setLoadingTeams(false);
                setLoadingScores(false);
            }
        }

        loadData();

    }, [formData.exercise, exercises]);

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
            if (exerciseDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un ejercicio"
                }
            }
            if (teamDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un equipo"
                }
            }
            if (scoreDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una puntuación"
                }
            }
            await punctuateTeam(formData);
            navigate("/monitor/punctuations");
            toast.success("Equipo '" + formData.team + "' puntuado con éxito en el ejercicio '" + formData.exercise + "'")
        } catch (err) {
            if (err.type === "warn") {
                toast.warning(err.message);
                return
            }
            toast.error(err.response?.data?.error || "Error al puntuar al equipo");
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
                                    <option key={o.exercise_id} value={o.exercise_id}>
                                        {o.exercise_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Itinerario</label>
                            <input
                                name="itinerary"
                                className="form-control read-only-field"
                                value={formData.itinerary}
                                onChange={handleChange}
                                required
                                disabled
                                >
                            </input>
                        </div>
                        <div>
                            <label className="form-label">Equipo</label>
                            <select
                                name="team"
                                className="form-control"
                                value={formData.team}
                                onChange={handleChange}
                                required
                                disabled={teamDisabled}
                                >
                                    <option value="">
                                        {loadingTeams ? "Cargando equipos" : !formData.exercise ? "-- Selecciona primero un ejercicio --" : exerciseDisabled ?
                                            "No hay equipos disponibles" : "-- Selecciona un equipo --"
                                        }
                                    </option>
                                {teams.map((o) => (
                                    <option key={o.team_id} value={o.team_id}>
                                        {o.team_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Puntuación</label>
                            <select
                                name="score"
                                className="form-control"
                                value={formData.score}
                                onChange={handleChange}
                                required
                                disabled={scoreDisabled}
                            >
                                <option value="">
                                    {loadingScores ?
                                        "Cargando rúbrica" :
                                        !formData.exercise ?
                                        "-- Selecciona primero un ejercicio --" :
                                        scoreDisabled ?
                                        "No hay una rúbrica disponible" :
                                        "-- Selecciona una puntuación --"
                                    }
                                </option>
                                {scores.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.value} - {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="element-form">
                        <h1></h1>
                        <button className="new-button" disabled={loading}>
                            {loading ? "Puntuando..." : "Puntuar"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
