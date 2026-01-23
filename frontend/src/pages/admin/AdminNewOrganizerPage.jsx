import { Container } from "react-bootstrap";
import NewOrganizer from "../../components/Organizers/New";
import PageHeader from "../../components/layouts/PageHeader";

export default function NewOrganizerPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación"
                backButtonRoute="/admin/organizers"
            />

            <NewOrganizer />
        </Container>

    );
}
