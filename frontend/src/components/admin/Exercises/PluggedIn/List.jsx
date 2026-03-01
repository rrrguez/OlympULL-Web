import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { createPluggedInExercise, deletePluggedInExercise, exportPluggedInExercises, getAllPluggedInExercises, importPluggedInExercises } from "../../../../api/admin/pluggedInExercisesApi";
import translateCategory from "../../../../utils/categories";
import OlympULLIconButton from "../../../buttons/OlympULLIconButton";
import ExercisesHeader from "../../../layouts/ExercisesHeader";
import ImportModal from "../../../modals/ImportModal";

export default function PluggedInExercisesList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportPluggedInExercisesFunction = async () => {
        try {
            const res = await exportPluggedInExercises();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "plugged-in-exercises.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    useEffect(() => {
        load();
    }, [refreshKey]);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllPluggedInExercises();
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

            await createPluggedInExercise(newExercise);
            toast.success("Ejercicio '" + exercise.name + "' duplicado con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    const remove = async (id, name) => {
        try {
            await deletePluggedInExercise(id);
            toast.success("Ejercicio '" + name + "' eliminado con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    return (
      <Container className="plugged-in-list">
        <ExercisesHeader
            title="Ejercicios enchufados"
            newButton={1}
            importButton={1}
            exportButton={1}
            newButtonText="Nuevo ejercicio enchufado"
            newButtonRoute="/admin/exercises/plugged-in/new"
            importButtonOnClick={() => setImportOpen(true)}
            exportButtonOnClick={exportPluggedInExercisesFunction}
        />
        <div className="table-wrap">
            <table className="table table-hover table-bordered">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Inputs</th>
                <th>Tiempo (segundos)</th>
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
                        <td>{o.inputs}</td>
                        <td>{o.time_limit}</td>
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
                                route={`/admin/exercises/plugged-in/edit/${o.id}`}
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
            onImport={importPluggedInExercises}
            title="Importar ejercicios enchufados"
            successMessage="Ejercicios importados con éxito"
            onSuccess={() => setRefreshKey(prev => prev + 1)}
        />
      </Container>
    );
  }
