import { Container } from "react-bootstrap";
import UsersList from "../../components/Users/List";
import PageHeader from "../../components/layouts/PageHeader";

export default function AdminUsersPage() {
    return (
        <Container>
            <PageHeader
                title="Gestión de cuentas de usuario"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nuevo usuario"
                newButtonRoute="/admin/users/new"
                importButtonRoute=""
                exportButtonRoute=""
                backButtonRoute="/admin"
            />

            <UsersList/>
        </Container>
    );
}
