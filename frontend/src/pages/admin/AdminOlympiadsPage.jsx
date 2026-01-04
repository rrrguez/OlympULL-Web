import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OlympiadsList from "../../components/Olympiads/List";
import PageHeader from "../../components/layouts/PageHeader";

export default function OlympiadsPage() {
    return (
        <Container>
            <PageHeader
                title = "Gestión de olimpiadas"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva olimpiada"
                newButtonRoute="/admin/olympiads/new"
                importButtonRoute=""
                exportButtonRoute=""
                backButtonRoute="/admin"
            />
            <OlympiadsList/>
        </Container>

    );
}
