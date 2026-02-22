import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { createRubric, deleteRubric, getAllRubrics } from "../../../api/admin/rubricsApi";
import OlympULLIconButton from "../../buttons/OlympULLIconButton";

export default function RubricsList({refreshKey}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [refreshKey]);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllRubrics();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id, name) => {
        try {
            await deleteRubric(id);
            toast.success("Rúbrica '" + name + "' eliminada con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    const duplicate = async (rubric) => {
        try {
            const newRubric = {
                ...rubric,
                id: rubric.id + "-copia",
                name: rubric.name + "-copia",
            };

            await createRubric(newRubric);
            toast.success("Rúbrica '" + rubric.name + "' duplicada con éxito");
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
                        <th>Nombre</th>
                        <th>Puntos</th>
                        <th>Etiquetas</th>
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
                        <tr key={o.id}>
                        <td>{o.name}</td>
                        <td>{o.points}</td>
                        <td>{o.labels}</td>
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
                                route={`/admin/rubrics/edit/${o.id}`}
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
            </div>
        </Container>
    );
}
