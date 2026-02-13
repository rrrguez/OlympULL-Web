import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteOrganizer, getAllOrganizers } from "../../api/organizersApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";

export default function OrganizerList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllOrganizers();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id, itinerary) => {
        try {
            await deleteOrganizer(id, itinerary);
            toast.success("Asignación eliminada con éxito");
            load();
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Organizador</th>
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
                    <tr key={`${o.id}-${o.itinerary}`}>
                    <td>{o.id}</td>
                    <td>{o.olympiad_name}</td>
                    <td>{o.itinerary_name}</td>
                    <td>
                        <div className="table-button-container only-delete">
                            <OlympULLIconButton
                                text="Eliminar"
                                title="Eliminar"
                                buttonClass="table-button"
                                onClick={() => remove(o.id, o.itinerary)}
                                icon="fa-regular fa-trash-can"
                            />
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
