import { Container } from "react-bootstrap";
import NewParticipant from "../../components/Participants/New";
import PageHeader from "../../components/layouts/PageHeader";

export default function NewParticipantPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación (Participante ➜ Itinerario)"
                backButtonRoute="/admin/participants"
            />

            <NewParticipant />
        </Container>

    );
}
