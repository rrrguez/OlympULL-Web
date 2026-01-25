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

function formatDate(dateFromDB) {
    const date = dateFromDB.split("T")[0];
    const formattedDateArray = date.split("-");
    const formattedDate = formattedDateArray[2] + "-" + formattedDateArray[1] + "-" + formattedDateArray[0];

    let time = dateFromDB.split("T")[1];
    time = time.split(".000Z")[0];
    let timeArray = time.split(":");
    time = timeArray[0] + ":" + timeArray[1];

    return formattedDate + ", " + time;
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
                <th>Fecha de inicio</th>
                <th>Fecha de final</th>
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
                <td>{formatDate(o.start)}</td>
                <td>{formatDate(o.stop)}</td>
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
        </table>
        </Container>
    );
}
