import { Container } from "react-bootstrap";
import EditPluggedIn from "../../components/Exercises/PluggedIn/Edit";
import PageHeader from "../../components/layouts/PageHeader";

export default function EditPluggedInPage() {
    return (
        <Container>
            <PageHeader
                title="Editar ejercicio"
                backButtonRoute="/admin/exercises"
            />

            <EditPluggedIn />
        </Container>

    );
}
