import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewUser from "../../../components/Users/New";

export default function NewUserPage() {
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
