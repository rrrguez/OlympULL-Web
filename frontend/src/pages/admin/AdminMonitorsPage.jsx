import { Container } from "react-bootstrap";
import MonitorsList from "../../components/Monitors/List";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importMonitors, exportMonitors } from "../../api/monitorsApi";

export default function AdminMonitorsPage() {
    const [importOpen, setImportOpen] = useState(false);

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

            <MonitorsList/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importMonitors}
                title="Importar asignaciones"
                successMessage="Asignaciones importadas con éxito"
            />
        </Container>
    );
}
