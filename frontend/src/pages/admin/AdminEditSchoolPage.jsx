import { Container } from "react-bootstrap";
import EditSchool from "../../components/Participants/EditSchool"
import PageHeader from "../../components/layouts/PageHeader";

export default function SchoolsPage() {
    return (
        <>
        <Container>
            <PageHeader
                title="Editar escuela"
                backButtonRoute="/admin/schools"
            />

            <EditSchool />
        </Container>
        </>
    );
}
