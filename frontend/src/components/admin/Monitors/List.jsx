import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteAssignation, getAllMonitors } from "../../../api/monitorsApi";
import OlympULLIconButton from "../../buttons/OlympULLIconButton";

export default function MonitorAssignationsList({refreshKey}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [refreshKey]);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllMonitors();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id, exercise, olympiad, itinerary) => {
        try {
            await deleteAssignation(id, exercise, olympiad, itinerary);
            toast.success("Asignación eliminada con éxito");
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
                        <th>Monitor</th>
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
                        {Array.from({ length: 5 }).map((_, j) => (
                            <td key={j}>
                            <div className="skeleton-cell"></div>
                            </td>
                        ))}
                        </tr>
                    ))
                    : data.map((o) => (
                        <tr key={`${o.id}-${o.exercise}-${o.olympiad}-${o.itinerary}`}>
                        <td>{o.id}</td>
                        <td>{o.exercise_name}</td>
                        <td>{o.olympiad_name}</td>
                        <td>{o.itinerary_name}</td>
                        <td>
                            <div className="table-button-container only-delete">
                            <OlympULLIconButton
                                text="Eliminar"
                                title="Eliminar"
                                buttonClass="table-button"
                                onClick={() => remove(o.id, o.exercise, o.olympiad, o.itinerary)}
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
