import { Container } from "react-bootstrap";
import UnpluggedExercisesList from "../../components/Exercises/UnpluggedList";
import PluggedInExercisesList from "../../components/Exercises/PluggedInList";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importPluggedInExercises, exportPluggedInExercises } from "../../api/pluggedInExercisesApi";
import { importUnpluggedExercises, exportUnpluggedExercises } from "../../api/unpluggedExercisesApi";

export default function ExercisesPage() {
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

    return (
        <Container>
            <PageHeader
                title = "Gestión de ejercicios"
                newButton={1}
                newButtonText="Nuevo ejercicio"
                newButtonRoute="/admin/olympiads/new"
                importButtonOnClick={() => setImportOpen(true)}
                //exportButtonOnClick={exportExercisesFunction}
                backButtonRoute="/admin"
            />

            <UnpluggedExercisesList/>
            <PluggedInExercisesList/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                //onImport={importExercises}
                title="Importar ejercicios"
                successMessage="Ejercicios importados con éxito"
            />
        </Container>

    );
}
