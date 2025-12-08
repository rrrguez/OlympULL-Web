import { Container } from "react-bootstrap";
import NewExercise from "../../components/Exercises/NewExercise";

export default function ExercisesPage() {
    return (
        <Container>
            <h2> Nuevo ejercicio </h2>

            <NewExercise />
        </Container>
    );
}
