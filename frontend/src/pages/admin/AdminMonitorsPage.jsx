import { Container } from "react-bootstrap";
import MonitorsList from "../../components/Monitors/List";
import PageHeader from "../../components/layouts/PageHeader";

export default function AdminMonitorsPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de usuarios monitores"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nueva asignación"
                newButtonRoute="/admin/monitors/new"
                importButtonRoute=""
                exportButtonRoute=""
                backButtonRoute="/admin"
            />

            <MonitorsList/>
        </Container>
    );
}
