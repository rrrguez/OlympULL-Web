import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewExerciseAssignation from "../../../components/organizer/Assignations/New";

export default function AssignationsPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación (Ejercicio ➜ Itinerario)"
                backButtonRoute={"/organizer/assignations/"}
            />

            <NewExerciseAssignation />
        </Container>

    );
}
