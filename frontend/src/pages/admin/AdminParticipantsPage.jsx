import { Container } from "react-bootstrap";
import ParticipantsList from "../../components/Participants/List";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importParticipants, exportParticipants } from "../../api/participantsApi";

export default function AdminOrganizersPage() {
    const [importOpen, setImportOpen] = useState(false);

    const exportParticipantsFunction = async () => {
        try {
            const res = await exportParticipants();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "participants.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de participantes"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/admin/participants/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportParticipantsFunction}
                backButtonRoute="/admin"
            />

            <ParticipantsList/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importParticipants}
                title="Importar asignaciones"
                successMessage="Asignaciones importadas con éxito"
            />
        </Container>
    );
}
