import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import PunctuationsList from "../../../components/monitor/Punctuations/List";

export default function PunctuationsListPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de puntuaciones"
                newButton={1}
                newButtonText="Puntuar equipo"
                newButtonRoute="/monitor/punctuations/new"
                backButtonRoute={"/monitor"}
            />

            <PunctuationsList/>

        </Container>

    );
}
