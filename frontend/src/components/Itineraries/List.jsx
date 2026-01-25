import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { deleteItinerary, getAllItineraries } from "../../api/itinerariesApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";

export default function ItinerariesList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllItineraries();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id) => {
        await deleteItinerary(id);
        load();
    };

    return (
        <Container>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Código</th>
                <th>Título</th>
                <th>Olimpiada</th>
                <th>Acciones rápidas</th>
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
            <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.olympiad}</td>
                <td>
                <div className="table-button-container with-duplicate">
                    <OlympULLIconButton
                        text="Duplicar"
                        title="Duplicar"
                        buttonClass="table-button"
                        route="/admin/olympiads"
                        icon="fa-solid fa-clone"
                    />
                    <OlympULLIconButton
                        text="Editar"
                        title="Editar"
                        buttonClass="table-button"
                        route="/admin/olympiads"
                        icon="fa-solid fa-pen-to-square"
                    />

                    <OlympULLIconButton
                        text="Eliminar"
                        title="Eliminar"
                        buttonClass="table-button"
                        route="/admin/olympiads"
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
