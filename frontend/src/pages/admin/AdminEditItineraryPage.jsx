import { Container } from "react-bootstrap";
import EditItinerary from "../../components/Itineraries/Edit";
import PageHeader from "../../components/layouts/PageHeader";

export default function EditItineraryPage() {
    return (
        <Container>
            <PageHeader
                title="Editar itinerario"
                backButtonRoute="/admin/itineraries"
            />

            <EditItinerary />
        </Container>

    );
}
