import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import UnpluggedExercisesList from "../../../components/Exercises/Unplugged/List";
import PluggedInExercisesList from "../../../components/Exercises/PluggedIn/List";

export default function ExercisesListPage() {
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
