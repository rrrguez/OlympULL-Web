import { Container } from "react-bootstrap";
import EditUnplugged from "../../components/Exercises/Unplugged/Edit";
import PageHeader from "../../components/layouts/PageHeader";

export default function EditUnpluggedPage() {
    return (
        <Container>
            <PageHeader
                title="Editar ejercicio"
                backButtonRoute="/admin/exercises"
            />

            <EditUnplugged />
        </Container>

    );
}
