import { Container } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import ItinerariesList from "../../components/Itineraries/List";
import PageHeader from "../../components/layouts/PageHeader";
import ImportModal from "../../components/modals/ImportModal";
import { importItineraries, exportItineraries } from "../../api/itinerariesApi";

export default function ItinerariesPage() {
    const [importOpen, setImportOpen] = useState(false);

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

            <ItinerariesList/>
            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importItineraries}
                title="Importar itinerarios"
                successMessage="Itinerarios importados con éxito"
            />
        </Container>

    );
}
