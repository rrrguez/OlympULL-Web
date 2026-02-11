import { Container } from "react-bootstrap";
import NewAssignation from "../../components/Exercises/Assignations/NewAssignation";
import PageHeader from "../../components/layouts/PageHeader";

export default function AssignationsPage() {
    return (
        <Container>
            <PageHeader
                title={
                    <>
                        Nueva asignación
                        <br />
                        Ejercicio ➜ Olimpiada
                    </>
                }
                backButtonRoute={"/admin/assignations/"}
            />

            <NewAssignation />
        </Container>

    );
}
