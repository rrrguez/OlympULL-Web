import { Container } from "react-bootstrap";
import PageHeader from "../../../../components/layouts/PageHeader";
import NewExerciseAssignation from "../../../../components/Exercises/Assignations/New";

export default function NewExerciseAssignationPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación (Ejercicio ➜ Olimpiada)"
                backButtonRoute={"/admin/assignations/"}
            />

            <NewExerciseAssignation />
        </Container>

    );
}
