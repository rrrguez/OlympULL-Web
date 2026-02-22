import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import EditOlympiad from "../../../components/Olympiads/Edit"

export default function EditOlympiadPage() {
    return (
        <Container>
            <PageHeader
                title="Editar olimpiada"
                backButtonRoute="/admin/olympiads"
            />

            <EditOlympiad />
        </Container>

    );
}
