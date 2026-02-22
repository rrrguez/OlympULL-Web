import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import EditTeam from "../../../components/admin/Teams/Edit";

export default function EditTeamPage() {
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
