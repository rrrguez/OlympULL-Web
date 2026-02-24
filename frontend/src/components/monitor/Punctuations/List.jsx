import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllPunctuations, removePunctuation } from "../../../api/monitor/monitorApi.js";
import OlympULLIconButton from "../../buttons/OlympULLIconButton";

export default function PunctuationsList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            try {
                setLoading(true);
                const res = await getAllPunctuations(localStorage.getItem("id"));
                setData(res.data);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        }
        loadData();
    };

    const remove = async (team, exercise, itinerary) => {
        try {
            await removePunctuation(team, exercise, itinerary);
            toast.success("Puntuación eliminada con éxito");
            load();
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al eliminar");
        }
    };

    return (
        <Container>
            <div className="table-wrap">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Itinerario</th>
                            <th>Ejercicio</th>
                            <th>Equipo</th>
                            <th>Puntuación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <td key={j}>
                                <div className="skeleton-cell"></div>
                                </td>
                            ))}
                            </tr>
                        ))
                        : data.map((o) => (
                        <tr key={`${o.team}-${o.exercise}-${o.olympiad}-${o.itinerary}`}>
                            <td>{o.itinerary_name} ({o.olympiad})</td>
                            <td>{o.exercise_name}</td>
                            <td>{o.team_name}</td>
                            <td>{o.score}</td>
                            <td>
                                <div className="table-button-container">
                                    <OlympULLIconButton
                                        text="Editar"
                                        title="Editar"
                                        buttonClass="table-button"
                                        route={`/monitor/punctuations/edit/${o.team}/${o.exercise}/${o.itinerary}`}
                                        icon="fa-solid fa-pen-to-square"
                                    />
                                    <OlympULLIconButton
                                        text="Eliminar"
                                        title="Eliminar"
                                        buttonClass="table-button"
                                        onClick={() => remove(o.team, o.exercise, o.itinerary)}
                                        icon="fa-regular fa-trash-can"
                                    />
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}
