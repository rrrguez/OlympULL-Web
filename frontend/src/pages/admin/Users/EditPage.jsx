import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import EditUser from "../../../components/Users/Edit";

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

