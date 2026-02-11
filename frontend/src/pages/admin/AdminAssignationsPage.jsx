import { Container } from "react-bootstrap";
import AssignationsList from "../../components/Exercises/Assignations/AssignationsList";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importAssignations, exportAssignations } from "../../api/assignationsApi";

export default function AssignationsPage() {
    const [importOpen, setImportOpen] = useState(false);

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

            <AssignationsList/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importAssignations}
                title="Importar asignaciones"
                successMessage="Asignaciones importadas con éxito"
            />
        </Container>

    );
}
