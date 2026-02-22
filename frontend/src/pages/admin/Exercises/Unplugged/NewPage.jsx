import { Container } from "react-bootstrap";
import PageHeader from "../../../../components/layouts/PageHeader";
import NewUnpluggedExercise from "../../../../components/Exercises/Unplugged/New";

export default function NewUnpluggedExercisePage() {
    return (
        <Container>
            <PageHeader
                title = "Nuevo ejercicio desenchufado"
                backButtonRoute="/admin/exercises"
            />
            <NewUnpluggedExercise />
        </Container>
    );
}
