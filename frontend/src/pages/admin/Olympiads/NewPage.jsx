import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewOlympiad from "../../../components/Olympiads/New"

export default function NewOlympiadPage() {
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
