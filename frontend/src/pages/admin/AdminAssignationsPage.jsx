import { Container } from "react-bootstrap";
import AssignationsList from "../../components/Exercises/Assignations/AssignationsList";
import PageHeader from "../../components/layouts/PageHeader";

export default function AssignationsPage() {
    return (
        <Container>
            <PageHeader
                title={
                    <>
                        Gestión de asignaciones
                    </>
                }
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/admin/assignations/olympiads/new"
                importButtonRoute=""
                exportButtonRoute=""
                backButtonRoute="/admin"
            />

            <AssignationsList/>
        </Container>

    );
}
