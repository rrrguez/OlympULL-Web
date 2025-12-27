import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UnpluggedExercisesList from "../../components/Exercises/UnpluggedList";
import PluggedInExercisesList from "../../components/Exercises/PluggedInList";

export default function ExercisesPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{display: "flex"}}>
                <h1> Gestión de ejercicios </h1>
                <div className="page-header-buttons">
                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                    onClick={() => navigate("/admin/exercises/new")}
                >
                    <i class="fa-solid fa-plus"></i>
                    Nuevo ejercicio
                </Button>
                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                >
                    <i class="fa-solid fa-file-arrow-down"></i>
                    Importar ejercicios
                </Button>
                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                >
                    <i class="fa-solid fa-file-arrow-up"></i>
                    Exportar ejercicios
                </Button>
                </div>
            </div>

            <UnpluggedExercisesList/>
            <PluggedInExercisesList/>
        </Container>

    );
}
