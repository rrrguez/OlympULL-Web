import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import EditPunctuation from "../../../components/monitor/Punctuations/Edit";

export default function EditPunctuationPage() {
    return (
        <Container>
            <PageHeader
                title="Editar puntuación"
                backButtonRoute={"/monitor/punctuations/"}
            />

            <EditPunctuation/>
        </Container>

    );
}
