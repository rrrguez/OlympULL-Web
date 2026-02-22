import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import PageHeader from "../../../components/layouts/PageHeader";
import ImportModal from "../../../components/modals/ImportModal";
import MonitorAssignationsList from "../../../components/admin/Monitors/List";
import { importMonitors, exportMonitors } from "../../../api/monitorsApi";

export default function MonitorAssignationsListPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportMonitorsFunction = async () => {
        try {
            const res = await exportMonitors();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "monitors.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de monitores"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/admin/monitors/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportMonitorsFunction}
                backButtonRoute="/admin"
            />

            <MonitorAssignationsList refreshKey={refreshKey}/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importMonitors}
                title="Importar asignaciones"
                successMessage="Asignaciones importadas con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>
    );
}
