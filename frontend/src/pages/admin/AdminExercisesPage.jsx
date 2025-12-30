import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OlympULLButton from "../../components/buttons/OlympULLButton";
import OlympULLIconButton from "../../components/buttons/OlympULLIconButton";
import UnpluggedExercisesList from "../../components/Exercises/UnpluggedList";
import PluggedInExercisesList from "../../components/Exercises/PluggedInList";

export default function ExercisesPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{display: "flex"}}>
                <h1> Gestión de ejercicios </h1>
                <div className="page-header-buttons">
                <OlympULLIconButton
                    text="Nuevo ejercicio"
                    buttonSize="lg"
                    buttonClass="me-2"
                    route="/admin/exercises/new"
                    icon="fa-solid fa-plus"
                />
                <OlympULLIconButton
                    text="Importar ejercicios"
                    buttonSize="lg"
                    buttonClass="me-2"
                    route="/admin/exercises/new"
                    icon="fa-solid fa-file-arrow-down"
                />
                <OlympULLIconButton
                    text="Exportar ejercicios"
                    buttonSize="lg"
                    buttonClass="me-2"
                    route="/admin/exercises/new"
                    icon="fa-solid fa-file-arrow-up"
                />
                </div>
            </div>

            <UnpluggedExercisesList/>
            <PluggedInExercisesList/>
        </Container>

    );
}
