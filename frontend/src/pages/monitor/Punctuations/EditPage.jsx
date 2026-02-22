import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";

export default function EditPunctuationPage() {
    return (
        <Container>
            <PageHeader
                title="Editar puntuación"
                backButtonRoute={"/monitor/punctuations/"}
            />

        </Container>

    );
}
