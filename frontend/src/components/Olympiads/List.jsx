import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { deleteOlympiad, getAllOlympiads, createOlympiad } from "../../api/olympiadsApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";
import { toast } from "react-toastify";
import formatDate from "../../utils/dates";
import getOlympiadStatus from "../../utils/olympiads";

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

    const remove = async (id, name) => {
        try {
            await deleteOlympiad(id);
            toast.success("Olimpiada '" + name + "' eliminada con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    const duplicate = async (olympiad) => {
        try {
            const newOlympiad = {
                ...olympiad,
                id: olympiad.id + " - copia",
                name: olympiad.name + " - copia",
            };

            await createOlympiad(newOlympiad);
            toast.success("Olimpiada '" + olympiad.name + "' duplicada con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
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
                <td>
                    {getOlympiadStatus(o.start, o.stop) === 'pending' && <i className="fa-regular fa-alarm-clock" />}
                    {getOlympiadStatus(o.start, o.stop) === 'active' && <i className="fa-solid fa-fire fa-fade" />}
                    {getOlympiadStatus(o.start, o.stop) === 'finished' && <i className="fa-regular fa-circle-check" />}
                </td>
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
                            onClick={() => duplicate(o)}
                            icon="fa-solid fa-clone"
                        />
                        <OlympULLIconButton
                            text="Editar"
                            title="Editar"
                            buttonClass="table-button"
                            route={`/admin/olympiads/edit/${o.id}`}
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
        </table>
        </Container>
    );
}
