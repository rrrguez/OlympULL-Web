import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editPunctuation, getPunctuation, getAllExercises, getRubric } from "../../../api/monitor/monitorApi";

export default function EditPunctuation() {
    const { team, exercise, itinerary } = useParams();
    const navigate = useNavigate();

    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingScores, setLoadingScores] = useState(false);

    const [formData, setFormData] = useState({
        team: "",
        exercise: "",
        itinerary: "",
        score: "",
    });


    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        async function loadScore() {
            try {
                const res = await getPunctuation(team, exercise, itinerary)
                const o = res.data[0];

                setFormData({
                    ...o
                })
            } catch (err) {
                console.log(err);
                toast.error("Error al cargar la puntuación");
                navigate("/monitor/punctuations");
            }
        }
        loadScore();
    }, [team, exercise, itinerary]);

    useEffect(() => {
        async function loadData() {
            setLoadingScores(true);
            try {
                setFormData({
                    ...formData,
                    team: team,
                    exercise: exercise,
                    itinerary: itinerary
                    });

                // fetch rubric
                const rubricRes = await getRubric(exercise);
                const pointsArray = rubricRes.data[0].points.split(",").map(p => p.trim());
                const labelsArray = rubricRes.data[0].labels.split(",").map(l => l.trim());
                setScores(pointsArray.map((p, idx) => ({ value: p, label: labelsArray[idx] || "" })));

            } catch (err) {
                console.error(err);
                toast.error("Error al cargar los datos");
            } finally {
                setLoadingScores(false);
            }
        }

        loadData();
    }, [team, exercise, itinerary]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await editPunctuation(formData);
            toast.success("Puntuación modificada con éxito");
            navigate("/monitor/punctuations");
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            }
            toast.error(err.response?.data?.error || "Error al modificar la puntuación");
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
                            <input
                                name="exercise"
                                className="form-control read-only-field"
                                value={formData.exercise}
                                onChange={handleChange}
                                required
                                disabled
                                >
                            </input>
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
                            <input
                                name="team"
                                className="form-control read-only-field"
                                value={formData.team}
                                onChange={handleChange}
                                required
                                disabled
                                >
                            </input>
                        </div>
                        <div>
                            <label className="form-label">Puntuación</label>
                            <select
                                name="score"
                                className="form-control"
                                value={formData.score}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    {loadingScores ?
                                        "Cargando rúbrica" :
                                        !formData.exercise ?
                                        "-- Selecciona primero un ejercicio --" :
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
