import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewMonitorAssignation from "../../../components/admin/Monitors/New";

export default function NewMonitorAssignationPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación (Monitor ➜ Ejercicio)"
                backButtonRoute="/admin/monitors"
            />

            <NewMonitorAssignation />
        </Container>

    );
}
