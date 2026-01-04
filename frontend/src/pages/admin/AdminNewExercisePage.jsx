import { Container } from "react-bootstrap";
import NewExercise from "../../components/Exercises/NewExercise";
import PageHeader from "../../components/layouts/PageHeader";

export default function ExercisesPage() {
    return (
        <Container>
            <PageHeader
                title = "Nuevo ejercicio"
                backButtonRoute="/admin/exercises"
            />
            <NewExercise />
        </Container>
    );
}
