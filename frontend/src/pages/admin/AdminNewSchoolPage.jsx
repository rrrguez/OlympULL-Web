import { Container } from "react-bootstrap";
import NewSchool from "../../components/Participants/NewSchool"
import PageHeader from "../../components/layouts/PageHeader";

export default function SchoolsPage() {
    return (
        <>
        <Container>
            <PageHeader
                title="Nueva escuela"
                backButtonRoute="/admin/schools"
            />

            <NewSchool />
        </Container>
        </>
    );
}
