import { Container } from "react-bootstrap";
import EditSchool from "../../components/Schools/EditSchool"
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
