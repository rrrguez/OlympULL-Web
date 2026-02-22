import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import PageHeader from "../../../components/layouts/PageHeader";
import ImportModal from "../../../components/modals/ImportModal";
import OlympiadsList from "../../../components/Olympiads/List";
import { importOlympiads, exportOlympiads } from "../../../api/olympiadsApi";

export default function OlympiadsListPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportOlympiadsFunction = async () => {
        try {
            const res = await exportOlympiads();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "olympiads.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title = "Gestión de olimpiadas"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva olimpiada"
                newButtonRoute="/admin/olympiads/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportOlympiadsFunction}
                backButtonRoute="/admin"
            />
            <OlympiadsList refreshKey={refreshKey}/>
            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importOlympiads}
                title="Importar olimpiadas"
                successMessage="Olimpiadas importadas con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>

    );
}
