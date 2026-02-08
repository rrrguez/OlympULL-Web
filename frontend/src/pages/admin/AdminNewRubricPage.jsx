import { Container } from "react-bootstrap";
import NewRubric from "../../components/Rubrics/NewRubric";
import PageHeader from "../../components/layouts/PageHeader";

export default function RubricsPage() {
    return (
        <>
        <Container>
            <PageHeader
                title="Nueva rúbrica"
                backButtonRoute="/admin/rubrics"
            />

            <NewRubric />
        </Container>
        </>
    );
}
