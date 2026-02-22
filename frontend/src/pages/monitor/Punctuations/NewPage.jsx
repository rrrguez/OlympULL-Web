import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";

export default function NewPunctuationPage() {
    return (
        <Container>
            <PageHeader
                title="Puntuar equipo"
                backButtonRoute={"/monitor/punctuations/"}
            />

        </Container>

    );
}
