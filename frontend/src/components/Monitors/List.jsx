import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { deleteMonitor, getAllMonitors } from "../../api/monitorsApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";

export default function MonitorList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllMonitors();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id) => {
        await deleteMonitor(id);
        load();
    };

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Monitor</th>
                    <th>Ejercicio</th>
                    <th>Itinerario</th>
                    <th>Olimpiada</th>
                    <th>Acciones rápidas</th>
                </tr>
                </thead>
                <tbody>
                {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="skeleton-row">
                    {Array.from({ length: 3 }).map((_, j) => (
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
                    <td>
                        <div className="table-button-container">
                        <OlympULLIconButton
                            text="Editar"
                            buttonClass="table-button"
                            route="/admin/monitors"
                            icon="fa-solid fa-pen-to-square"
                        />

                        <OlympULLIconButton
                            text="Eliminar"
                            buttonClass="table-button"
                            route="/admin/monitors"
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
