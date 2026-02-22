import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import ExerciseAssignationsList from "../../../components/organizer/Assignations/List";

export default function ExerciseAssignationsListPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de asignaciones"
                newButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/organizer/assignations/new"
                backButtonRoute="/organizer"
            />

            <ExerciseAssignationsList/>
        </Container>

    );
}
