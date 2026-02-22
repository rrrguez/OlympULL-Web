import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewOrganizerAssignation from "../../../components/admin/Organizers/New";

export default function NewOrganizerAssignationPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación (Organizador ➜ Itinerario)"
                backButtonRoute="/admin/organizers"
            />

            <NewOrganizerAssignation />
        </Container>

    );
}
