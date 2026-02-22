import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import PageHeader from "../../../components/layouts/PageHeader";
import ImportModal from "../../../components/modals/ImportModal";
import TeamsList from "../../../components/admin/Teams/List";
import { importTeams, exportTeams } from "../../../api/teamsApi";

export default function TeamsListPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

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

            <TeamsList refreshKey={refreshKey}/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importTeams}
                title="Importar equipos"
                successMessage="Equipos importados con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>
    );
}
