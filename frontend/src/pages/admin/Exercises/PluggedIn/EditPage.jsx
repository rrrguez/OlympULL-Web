import { Container } from "react-bootstrap";
import PageHeader from "../../../../components/layouts/PageHeader";
import EditPluggedInExercise from "../../../../components/admin/Exercises/PluggedIn/Edit";

export default function EditPluggedInExercisePage() {
    return (
        <Container>
            <PageHeader
                title="Editar ejercicio"
                backButtonRoute="/admin/exercises"
            />

            <EditPluggedInExercise />
        </Container>

    );
}
