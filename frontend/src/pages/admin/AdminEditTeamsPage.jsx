import { Container } from "react-bootstrap";
import EditTeam from "../../components/Teams/EditTeam";
import PageHeader from "../../components/layouts/PageHeader";

export default function OlympiadsPage() {
    return (
        <Container>
            <PageHeader
                title="Editar equipo"
                backButtonRoute="/admin/teams"
            />

            <EditTeam />
        </Container>

    );
}
