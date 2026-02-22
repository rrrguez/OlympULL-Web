import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewItinerary from "../../../components/admin/Itineraries/New";

export default function NewItineraryPage() {
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
