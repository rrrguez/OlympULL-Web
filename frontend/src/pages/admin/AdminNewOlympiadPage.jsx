import { Container } from "react-bootstrap";
import NewOlympiad from "../../components/Olympiads/New";
import PageHeader from "../../components/layouts/PageHeader";

export default function OlympiadsPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva olimpiada"
                backButtonRoute="/admin/olympiads"
            />

            <NewOlympiad />
        </Container>

    );
}
