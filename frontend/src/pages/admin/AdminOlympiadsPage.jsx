import { Container } from "react-bootstrap";
import OlympiadsList from "../../components/Olympiads/List";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";

export default function OlympiadsPage() {
    const [importOpen, setImportOpen] = useState(false);

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
                exportButtonOnClick=""
                backButtonRoute="/admin"
            />
            <OlympiadsList/>
            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
            />
        </Container>

    );
}
