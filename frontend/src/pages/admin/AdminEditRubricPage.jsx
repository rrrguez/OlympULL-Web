import { Container } from "react-bootstrap";
import EditRubric from "../../components/Rubrics/EditRubric";
import PageHeader from "../../components/layouts/PageHeader";

export default function OlympiadsPage() {
    return (
        <Container>
            <PageHeader
                title="Editar olimpiada"
                backButtonRoute="/admin/rubrics"
            />

            <EditRubric />
        </Container>

    );
}
