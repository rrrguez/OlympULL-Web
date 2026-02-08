import { Container } from "react-bootstrap";
import UnpluggedExercisesList from "../../components/Exercises/Unplugged/List";
import PluggedInExercisesList from "../../components/Exercises/PluggedIn/List";
import PageHeader from "../../components/layouts/PageHeader";

export default function ExercisesPage() {
    return (
        <Container>
            <PageHeader
                title = "Gestión de ejercicios"
                newButton={0}
                backButtonRoute="/admin"
            />
            <UnpluggedExercisesList/>
            <PluggedInExercisesList/>
        </Container>

    );
}
