import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import EditRubric from "../../../components/Rubrics/Edit";

export default function EditRubricPage() {
    return (
        <Container>
            <PageHeader
                title="Editar rúbrica"
                backButtonRoute="/admin/rubrics"
            />

            <EditRubric />
        </Container>

    );
}
