import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteParticipant, getAllParticipants } from "../../api/participantsApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";

export default function ParticipantAssignationsList({refreshKey}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [refreshKey]);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllParticipants();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id, school, itinerary) => {
        try {
            await deleteParticipant(id, school, itinerary);
            toast.success("Asignación eliminada con éxito");
            load();
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <div className="table-wrap">
                <table className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>Participante</th>
                        <th>Escuela</th>
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
                        <tr key={`${o.id}-${o.itinerary}`}>
                        <td>{o.id}</td>
                        <td>{o.school_name}</td>
                        <td>{o.olympiad_name}</td>
                        <td>{o.itinerary_name}</td>
                        <td>
                            <div className="table-button-container only-delete">
                                <OlympULLIconButton
                                    text="Eliminar"
                                    title="Eliminar"
                                    buttonClass="table-button"
                                    onClick={() => remove(o.id, o.school, o.itinerary)}
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
