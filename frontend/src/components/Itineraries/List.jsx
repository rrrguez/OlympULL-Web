import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { createItinerary, deleteItinerary, getAllItineraries } from "../../api/itinerariesApi";
import { getOlympiad } from "../../api/olympiadsApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";
import { toast } from "react-toastify";

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

    const remove = async (id, name) => {
        try {
            await deleteItinerary(id);
            toast.success("Itinerario '" + name + "' eliminado con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    const duplicate = async (itinerary) => {
        try {
            const newItinerary = {
                ...itinerary,
                id: itinerary.id + " - copia",
                name: itinerary.name + " - copia",
            };

            await createItinerary(newItinerary);
            toast.success("Itinerario '" + itinerary.name + "' duplicado con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    return (
        <Container>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Nombre</th>
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
                <td>{o.name}</td>
                <td>{o.olympiad_name}</td>
                <td>
                <div className="table-button-container with-duplicate">
                    <OlympULLIconButton
                        text="Duplicar"
                        title="Duplicar"
                        buttonClass="table-button"
                        onClick={() => duplicate(o)}
                        icon="fa-solid fa-clone"
                    />
                    <OlympULLIconButton
                        text="Editar"
                        title="Editar"
                        buttonClass="table-button"
                        route={`/admin/itineraries/edit/${o.id}`}
                        icon="fa-solid fa-pen-to-square"
                    />

                    <OlympULLIconButton
                        text="Eliminar"
                        title="Eliminar"
                        buttonClass="table-button"
                        onClick={() => remove(o.id, o.name)}
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
