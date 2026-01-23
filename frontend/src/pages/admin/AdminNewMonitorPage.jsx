import { Container } from "react-bootstrap";
import NewMonitor from "../../components/Monitors/New";
import PageHeader from "../../components/layouts/PageHeader";

export default function NewMonitorPage() {
    return (
        <Container>
            <PageHeader
                title="Nueva asignación"
                backButtonRoute="/admin/monitors"
            />

            <NewMonitor />
        </Container>

    );
}
