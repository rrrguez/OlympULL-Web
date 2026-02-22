import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import EditItinerary from "../../../components/Itineraries/Edit"

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
