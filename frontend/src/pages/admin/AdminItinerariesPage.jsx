import { Container } from "react-bootstrap";
import ItinerariesList from "../../components/Itineraries/List";
import PageHeader from "../../components/layouts/PageHeader";

export default function ItinerariesPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de itinerarios"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nuevo itinerario"
                newButtonRoute="/admin/itineraries/new"
                backButtonRoute="/admin"
            />

            <ItinerariesList/>
        </Container>

    );
}
