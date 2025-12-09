import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ItinerariesList from "../../components/Itineraries/List";

export default function ItinerariesPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{display: "flex"}}>
                <h2> Gestión de itinerarios </h2>

                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                    onClick={() => navigate("/admin/itineraries/new")}
                >
                    Nuevo itinerario
                </Button>

            </div>


            <ItinerariesList/>
        </Container>

    );
}
