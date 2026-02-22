import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllExercises, getAllTeams, getRubric } from "../../../api/monitor/monitorApi";

export default function NewPunctuationList() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        team: "",
        exercise: "",
        olympiad: "",
        itinerary: "",
        score: null,
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
        if (formData.exercise) {
            const selected = exercises.find(
                i => i.exercise_id === formData.exercise
            );

            if (selected) {
                setFormData(prev => ({
                    ...prev,
                    itinerary: selected.itinerary_id
                }));
            }
        }
    }, [formData.exercise, exercises])

    useEffect(() => {
        if (formData.exercise) {
            async function loadTeams(itinerary) {
                try {
                    setLoadingTeams(true)
                    const res = await getAllTeams(itinerary);
                    setTeams(res.data);
                } catch (err) {
                    console.error("Error cargando los equipos", err);
                    toast.error("Error cargando los equipos");
                } finally {
                    setLoadingTeams(false)
                }
            }
            loadTeams(formData.itinerary);

            async function loadScores(exercise) {
                try {
                    setLoadingScores(true)
                    const res = await getRubric(exercise);

                    const pointsArray = res.data[0].points.split(",").map(p => p.trim());
                    const labelsArray = res.data[0].labels.split(",").map(l => l.trim());

                    setScores(
                        pointsArray.map((point, index) => ({
                            value: point,
                            label: labelsArray[index] || ""
                        }))
                    );

                } catch (err) {
                    if (err.type === "error") {
                        toast.error(err.message)
                        return
                    }
                    console.error("Error cargando la rúbrica", err);
                    toast.error("Error cargando la rúbrica");
                } finally {
                    setLoadingScores(false)
                }
            }
            loadScores(formData.exercise)
        }
    }, [formData.exercise])

    useEffect(() => {
        if (!formData.exercise) {
            setScores([]);
            return;
        }
    }, [formData.exercise]);

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        //TODO
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
                                        {loadingExercises ? "Cargando equipos" : !formData.exercise ? "-- Selecciona primero un ejercicio --" : exerciseDisabled ?
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
