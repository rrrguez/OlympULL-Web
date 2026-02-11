import { Container } from "react-bootstrap";
import TeamsList from "../../components/Participants/TeamsList"
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importTeams, exportTeams } from "../../api/teamsApi";

export default function TeamsPage() {
    const [importOpen, setImportOpen] = useState(false);

    const exportTeamsFunction = async () => {
        try {
            const res = await exportTeams();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "teams.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de equipos"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nuevo equipo"
                newButtonRoute="/admin/teams/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportTeamsFunction}
                backButtonRoute="/admin"
            />

            <TeamsList/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importTeams}
                title="Importar equipos"
                successMessage="Equipos importados con éxito"
            />
        </Container>
    );
}
