import { Container } from "react-bootstrap";
import NewAssignation from "../../components/Exercises/NewAssignation";

export default function AssignationsPage() {
    return (
        <Container>
            <h2> Nueva asignación de ejercicio a olimpiada  </h2>

            <NewAssignation />
        </Container>

    );
}
