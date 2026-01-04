import { Container } from "react-bootstrap";
import NewUser from "../../components/Users/New";
import PageHeader from "../../components/layouts/PageHeader";

export default function UsersPage() {
    return (
        <>
        <Container>
            <PageHeader
                title="Nuevo usuario"
                backButtonRoute="/admin/users"
            />

            <NewUser />
        </Container>
        </>
    );
}
