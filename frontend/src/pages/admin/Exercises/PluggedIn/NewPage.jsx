import { Container } from "react-bootstrap";
import PageHeader from "../../../../components/layouts/PageHeader";
import NewPluggedInExercise from "../../../../components/Exercises/PluggedIn/New";

export default function NewPluggedInExercisePage() {
    return (
        <Container>
            <PageHeader
                title = "Nuevo ejercicio enchufado"
                backButtonRoute="/admin/exercises"
            />
            <NewPluggedInExercise />
        </Container>
    );
}
