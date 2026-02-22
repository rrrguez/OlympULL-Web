import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import EditSchool from "../../../components/Schools/Edit";

export default function EditSchoolPage() {
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
