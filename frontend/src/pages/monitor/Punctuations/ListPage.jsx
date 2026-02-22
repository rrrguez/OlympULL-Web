import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";

export default function PunctuationsListPage() {
    return (
        <Container>
            <PageHeader
                title="Puntuaciones de equipos"
                backButtonRoute={"/monitor/"}
            />

        </Container>

    );
}
