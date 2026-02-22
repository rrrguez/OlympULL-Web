import { useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { exportItineraries, importItineraries } from "../../../api/admin/itinerariesApi";
import ItinerariesList from "../../../components/admin/Itineraries/List";
import PageHeader from "../../../components/layouts/PageHeader";
import ImportModal from "../../../components/modals/ImportModal";

export default function ItinerariesListPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportItinerariesFunction = async () => {
        try {
            const res = await exportItineraries();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "itineraries.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title = "Gestión de itinerarios"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nuevo itinerario"
                newButtonRoute="/admin/itineraries/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportItinerariesFunction}
                backButtonRoute="/admin"
            />

            <ItinerariesList refreshKey={refreshKey}/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importItineraries}
                title="Importar itinerarios"
                successMessage="Itinerarios importados con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>

    );
}
