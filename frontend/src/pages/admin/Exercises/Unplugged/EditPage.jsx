import { Container } from "react-bootstrap";
import PageHeader from "../../../../components/layouts/PageHeader";
import EditUnpluggedExercise from "../../../../components/Exercises/Unplugged/Edit"

export default function EditUnpluggedExercisePage() {
    return (
        <Container>
            <PageHeader
                title="Editar ejercicio"
                backButtonRoute="/admin/exercises"
            />

            <EditUnpluggedExercise />
        </Container>

    );
}
