import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { deleteOlympiad, getAllOlympiads } from "../../api/olympiadsApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";

function getOlympiadStatusIcon(start, stop) {
    const now = new Date();
    const startDate = new Date(start);
    const stopDate = new Date(stop);

    if (now < startDate) {
        return (
            <i
                className="fa-regular fa-alarm-clock"
                title="Pendiente"
            />
        );
    }

    if (now >= startDate && now <= stopDate) {
        return (
            <i
                className="fa-solid fa-fire fa-fade"
                title="En curso"
            />
        );
    }

    return (
        <i
            className="fa-regular fa-circle-check"
            title="Finalizada"
        />
    );
}

export default function OlympiadsList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllOlympiads();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id) => {
        await deleteOlympiad(id);
        load();
    };

    return (
        <Container>
        <table className="table table-hover table-bordered">
            <thead>
            <tr>
                <th></th>
                <th>Código</th>
                <th>Título</th>
                <th>Fecha y hora de inicio</th>
                <th>Fecha y hora de final</th>
                <th>Acciones rápidas</th>
            </tr>
            </thead>
            <tbody>
            {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="skeleton-row">
                {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j}>
                    <div className="skeleton-cell"></div>
                    </td>
                ))}
                </tr>
            ))
            : data.map((o) => (
                <tr key={o.id}>
                <td>{getOlympiadStatusIcon(o.start, o.stop)}</td>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.start}</td>
                <td>{o.stop}</td>
                <td>
                    <div className="table-button-container">
                        <OlympULLIconButton
                            text="Editar"
                            buttonClass="table-button"
                            route="/admin/olympiads"
                            icon="fa-solid fa-pen-to-square"
                        />

                        <OlympULLIconButton
                            text="Eliminar"
                            buttonClass="table-button"
                            route="/admin/olympiads"
                            icon="fa-regular fa-trash-can"
                        />
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </Container>
    );
}
