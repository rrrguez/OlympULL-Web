import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewSchool from "../../../components/admin/Schools/New";

export default function NewSchoolPage() {
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
