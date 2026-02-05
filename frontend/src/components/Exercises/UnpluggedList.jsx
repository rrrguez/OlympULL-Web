import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { deleteUnpluggedExercise, getAllUnpluggedExercises } from "../../api/unpluggedExercisesApi";
import OlympULLIconButton from "../../components/buttons/OlympULLIconButton";
import translateCategory from "../../utils/categories";

export default function UnpluggedExercisesList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllUnpluggedExercises();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id) => {
        await deleteUnpluggedExercise(id);
        load();
    };

    return (
        <Container>
            <h2>Ejercicios desenchufados</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Recursos</th>
                    <th>Rúbrica</th>
                    <th>Acciones rápidas</th>
                </tr>
                </thead>
                <tbody>
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                            {Array.from({ length: 7 }).map((_, j) => (
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
                    <td>{translateCategory(o.category)}</td>
                    <td>{o.resources}</td>
                    <td>{o.rubric}</td>
                    <td>
                        <div className="table-button-container with-duplicate">
                            <OlympULLIconButton
                                text="Duplicar"
                                title="Duplicar"
                                buttonClass="table-button"
                                route="/admin/exercises"
                                icon="fa-solid fa-clone"
                            />

                            <OlympULLIconButton
                                text="Editar"
                                title="Editar"
                                buttonClass="table-button"
                                route="/admin/exercises"
                                icon="fa-solid fa-pen-to-square"
                            />

                            <OlympULLIconButton
                                text="Eliminar"
                                title="Eliminar"
                                buttonClass="table-button"
                                route="/admin/exercises"
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
