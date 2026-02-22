import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllPunctuations } from "../../../api/monitor/monitorApi.js"
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

    const remove = async (team, exercise, itinerary, olympiad) => {
        try {
            // TODO
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    return (
        <Container>
            <div className="table-wrap">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Equipo</th>
                            <th>Ejercicio</th>
                            <th>Olimpiada</th>
                            <th>Itinerario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                            {Array.from({ length: 4 }).map((_, j) => (
                                <td key={j}>
                                <div className="skeleton-cell"></div>
                                </td>
                            ))}
                            </tr>
                        ))
                        : data.map((o) => (
                        <tr key={`${o.team}-${o.exercise}-${o.olympiad}-${o.itinerary}`}>
                            <td>{o.team}</td>
                            <td>{o.exercise}</td>
                            <td>{o.olympiad}</td>
                            <td>{o.itinerary}</td>
                            <td>
                                <div className="table-button-container only-delete">
                                    <OlympULLIconButton
                                        text="Eliminar"
                                        title="Eliminar"
                                        buttonClass="table-button"
                                        onClick={() => remove(o.exercise, o.olympiad, o.itinerary)}
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
