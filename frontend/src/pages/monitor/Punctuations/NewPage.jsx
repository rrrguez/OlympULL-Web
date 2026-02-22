import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewPunctuation from "../../../components/monitor/Punctuations/New"

export default function NewPunctuationPage() {
    return (
        <Container>
            <PageHeader
                title="Puntuar equipo"
                backButtonRoute={"/monitor/punctuations/"}
            />

            <NewPunctuation/>

        </Container>

    );
}
