import { Container } from "react-bootstrap";
import PageHeader from "../../components/layouts/PageHeader";
import CmsForm from "../../components/admin/CMS/Form";

export default function CMSPage() {
    return (
        <Container>
            <PageHeader
                title = "Conexión con CMS"
                backButtonRoute="/admin"
            />
            <CmsForm/>
        </Container>

    );
}
