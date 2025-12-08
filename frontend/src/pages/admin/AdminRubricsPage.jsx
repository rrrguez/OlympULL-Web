import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RubricsList from "../../components/Exercises/RubricList";

export default function RubricsPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{display: "flex"}}>
                <h2> Gestión de rúbricas </h2>

                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                    onClick={() => navigate("/admin/rubrics/new")}
                >
                    Nueva rúbrica
                </Button>

            </div>

            <RubricsList/>
        </Container>

    );
}
