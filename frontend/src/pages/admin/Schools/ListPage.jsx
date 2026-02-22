import { Container } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../../components/layouts/PageHeader";
import ImportModal from "../../../components/modals/ImportModal";
import SchoolsList from "../../../components/Schools/List";
import { importSchools, exportSchools } from "../../../api/schoolsApi";

export default function SchoolsListPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportSchoolsFunction = async () => {
        try {
            const res = await exportSchools();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "schools.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de escuelas"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva escuela"
                newButtonRoute="/admin/schools/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportSchoolsFunction}
                backButtonRoute="/admin"
            />

            <SchoolsList refreshKey={refreshKey}/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importSchools}
                title="Importar escuelas"
                successMessage="Escuelas importadas con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>
    );
}
