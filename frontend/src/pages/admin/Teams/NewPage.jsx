import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewTeam from "../../../components/Teams/New";

export default function NewTeamPage() {
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
