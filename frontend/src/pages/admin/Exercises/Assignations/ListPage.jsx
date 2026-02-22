import { useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { exportAssignations, importAssignations } from "../../../../api/admin/assignationsApi";
import ExerciseAssignationsList from "../../../../components/admin/Exercises/Assignations/List";
import PageHeader from "../../../../components/layouts/PageHeader";
import ImportModal from "../../../../components/modals/ImportModal";

export default function ExerciseAssignationsListPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportAssignationsFunction = async () => {
        try {
            const res = await exportAssignations();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "exercise-assignations.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de asignaciones"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/admin/assignations/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportAssignationsFunction}
                backButtonRoute="/admin"
            />

            <ExerciseAssignationsList refreshKey={refreshKey}/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importAssignations}
                title="Importar asignaciones"
                successMessage="Asignaciones importadas con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>

    );
}
