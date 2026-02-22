import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewParticipantAssignation from "../../../components/admin/Participants/New";

export default function NewParticipantAssignationPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación (Participante ➜ Itinerario)"
                backButtonRoute="/admin/participants"
            />

            <NewParticipantAssignation />
        </Container>

    );
}
