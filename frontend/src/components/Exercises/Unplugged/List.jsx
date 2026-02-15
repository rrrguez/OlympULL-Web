import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { createUnpluggedExercise, deleteUnpluggedExercise, exportUnpluggedExercises, getAllUnpluggedExercises, importUnpluggedExercises } from "../../../api/unpluggedExercisesApi";
import translateCategory from "../../../utils/categories";
import OlympULLIconButton from "../../buttons/OlympULLIconButton";
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

    const duplicate = async (exercise) => {
        try {
            const newExercise = {
                ...exercise,
                id: exercise.id + "-copia",
                name: exercise.name + "-copia",
            };

            await createUnpluggedExercise(newExercise);
            toast.success("Ejercicio '" + exercise.name + "' duplicado con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    const remove = async (id, name) => {
        try {
            await deleteUnpluggedExercise(id);
            toast.success("Ejercicio '" + name + "' eliminado con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
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
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportUnpluggedExercisesFunction}
            />

            <div className="table-wrap">
                <table className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Recursos</th>
                        <th>Rúbrica</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="skeleton-row">
                                {Array.from({ length: 5 }).map((_, j) => (
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
                        <td>{o.rubric_name}</td>
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
                                    route={`/admin/exercises/unplugged/edit/${o.id}`}
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
            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importUnpluggedExercises}
                title="Importar ejercicios desenchufados"
                successMessage="Ejercicios importados con éxito"
            />
        </Container>
    );
}
