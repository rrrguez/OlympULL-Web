import { Container } from "react-bootstrap";
import NewItinerary from "../../components/Itineraries/New";
import PageHeader from "../../components/layouts/PageHeader";

export default function ItinerariesPage() {
    return (
        <Container>
            <PageHeader
                title="Nuevo itinerario"
                backButtonRoute="/admin/itineraries"
            />

            <NewItinerary />
        </Container>

    );
}
