import { Container } from "react-bootstrap";
import EditUser from "../../components/Users/Edit";
import PageHeader from "../../components/layouts/PageHeader";

export default function EditUserPage() {
    return (
        <Container>
            <PageHeader
                title="Editar usuario"
                backButtonRoute="/admin/users"
            />

            <EditUser />
        </Container>

    );
}

