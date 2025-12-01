import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExercisesList from "../../components/Exercises/List";

export default function ExercisesPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{display: "flex"}}>
                <h2> Gestión de ejercicios </h2>

                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                    onClick={() => navigate("/admin/exercises/new")}
                >
                    Nuevo ejercicio
                </Button>

            </div>

            <ExercisesList/>
        </Container>

    );
}
