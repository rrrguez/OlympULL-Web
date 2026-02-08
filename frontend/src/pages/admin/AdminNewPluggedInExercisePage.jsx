import { Container } from "react-bootstrap";
import NewExercise from "../../components/Exercises/PluggedIn/New.jsx";
import PageHeader from "../../components/layouts/PageHeader";

export default function NewPluggedInExercise() {
    return (
        <Container>
            <PageHeader
                title = "Nuevo ejercicio enchufado"
                backButtonRoute="/admin/exercises"
            />
            <NewExercise />
        </Container>
    );
}
