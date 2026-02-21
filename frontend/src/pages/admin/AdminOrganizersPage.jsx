import { Container } from "react-bootstrap";
import OrganizersList from "../../components/Organizers/List";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importOrganizers, exportOrganizers } from "../../api/organizersApi";

export default function AdminOrganizersPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportOrganizersFunction = async () => {
        try {
            const res = await exportOrganizers();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "organizers.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de organizadores"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/admin/organizers/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportOrganizersFunction}
                backButtonRoute="/admin"
            />

            <OrganizersList refreshKey={refreshKey}/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importOrganizers}
                title="Importar asignaciones"
                successMessage="Asignaciones importadas con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>
    );
}
