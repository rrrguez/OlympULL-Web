import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { deleteUnpluggedExercise, getAllUnpluggedExercises } from "../../../api/unpluggedExercisesApi";
import OlympULLIconButton from "../../buttons/OlympULLIconButton";
import translateCategory from "../../../utils/categories";
import ExercisesHeader from "../../layouts/ExercisesHeader";
import ImportModal from "../../modals/ImportModal";

export default function UnpluggedExercisesList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [importOpen, setImportOpen] = useState(false);

    const exportUnpluggedExercisesFunction = async () => {
        try {
            const res = await exportUnpluggedExercises();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "unplugged-exercises.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

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
            <ExercisesHeader
                title="Ejercicios desenchufados"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nuevo ejercicio desenchufado"
                newButtonRoute="/admin/exercises/unplugged/new"
                importButtonOnClick=""
                exportButtonOnClick=""
            />

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nombre</th>
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
