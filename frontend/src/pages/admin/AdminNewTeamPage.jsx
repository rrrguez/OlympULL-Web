import { Container } from "react-bootstrap";
import NewTeam from "../../components/Teams/NewTeam"
import PageHeader from "../../components/layouts/PageHeader";

export default function TeamsPage() {
    return (
        <>
        <Container>
            <PageHeader
                title="Nuevo equipo"
                backButtonRoute="/admin/teams"
            />

            <NewTeam />
        </Container>
        </>
    );
}
