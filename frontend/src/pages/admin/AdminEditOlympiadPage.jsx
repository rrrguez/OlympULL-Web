import { Container } from "react-bootstrap";
import EditOlympiad from "../../components/Olympiads/Edit";
import PageHeader from "../../components/layouts/PageHeader";

export default function OlympiadsPage() {
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
