import { Container } from "react-bootstrap";
import NewAssignation from "../../components/Exercises/Assignations/New";
import PageHeader from "../../components/layouts/PageHeader";

export default function AssignationsPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación (Ejercicio ➜ Itinerario)"
                backButtonRoute={"/organizer/assignations/"}
            />

            <NewAssignation />
        </Container>

    );
}
