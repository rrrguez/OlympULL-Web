import { Container } from "react-bootstrap";
import NewItinerary from "../../components/Itineraries/New";

export default function ItinerariesPage() {
    return (
        <Container>
            <h2> Nuevo itinerario  </h2>

            <NewItinerary />
        </Container>

    );
}
