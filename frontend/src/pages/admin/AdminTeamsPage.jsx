import { Container } from "react-bootstrap";
import TeamsList from "../../components/Participants/TeamsList"
import PageHeader from "../../components/layouts/PageHeader";

export default function TeamsPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de equipos"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nuevo equipo"
                newButtonRoute="/admin/teams/new"
                importButtonRoute=""
                exportButtonRoute=""
                backButtonRoute="/admin"
            />

            <TeamsList/>
        </Container>
    );
}
