import { Container } from "react-bootstrap";
import RubricsList from "../../components/Exercises/RubricList";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importRubrics, exportRubrics } from "../../api/rubricsApi";

export default function RubricsPage() {
    const [importOpen, setImportOpen] = useState(false);

    const exportRubricsFunction = async () => {
        try {
            const res = await exportRubrics();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "rubrics.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de rúbricas"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva rúbrica"
                newButtonRoute="/admin/rubrics/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportRubricsFunction}
                backButtonRoute="/admin"
            />
            <RubricsList/>
            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importRubrics}
                title="Importar rúbricas"
                successMessage="Rúbricas importadas con éxito"
            />
        </Container>
    );
}
