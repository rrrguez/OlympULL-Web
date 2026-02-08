import { Container } from "react-bootstrap";
import NewExercise from "../../components/Exercises/Unplugged/New.jsx";
import PageHeader from "../../components/layouts/PageHeader";

export default function NewUnpluggedExercise() {
    return (
        <Container>
            <PageHeader
                title = "Nuevo ejercicio desenchufado"
                backButtonRoute="/admin/exercises"
            />
            <NewExercise />
        </Container>
    );
}
