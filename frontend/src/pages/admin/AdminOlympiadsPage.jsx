import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OlympiadsList from "../../components/Olympiads/List";

export default function OlympiadsPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{display: "flex"}}>
                <h2> Gestión de olimpiadas </h2>

                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                    onClick={() => navigate("/admin/olympiads/new")}
                >
                    Nueva olimpiada
                </Button>
            </div>
            <OlympiadsList/>
        </Container>

    );
}
