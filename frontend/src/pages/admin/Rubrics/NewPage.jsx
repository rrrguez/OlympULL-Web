import { Container } from "react-bootstrap";
import PageHeader from "../../../components/layouts/PageHeader";
import NewRubric from "../../../components/Rubrics/New";

export default function NewRubricPage() {
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
