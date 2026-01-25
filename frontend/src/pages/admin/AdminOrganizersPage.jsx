import { Container } from "react-bootstrap";
import OrganizersList from "../../components/Organizers/List";
import PageHeader from "../../components/layouts/PageHeader";

export default function AdminOrganizersPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de organizadores"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/admin/organizers/new"
                importButtonRoute=""
                exportButtonRoute=""
                backButtonRoute="/admin"
            />

            <OrganizersList/>
        </Container>
    );
}
