import { Container } from "react-bootstrap";
import SchoolsList from "../../components/Participants/SchoolsList";
import PageHeader from "../../components/layouts/PageHeader";

export default function SchoolsPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de escuelas"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva escuela"
                newButtonRoute="/admin/schools/new"
                importButtonRoute=""
                exportButtonRoute=""
                backButtonRoute="/admin"
            />

            <SchoolsList/>
        </Container>
    );
}
