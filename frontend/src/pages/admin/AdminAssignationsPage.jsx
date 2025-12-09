import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AssignationsList from "../../components/Exercises/AssignationsList";

export default function AssignationsPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <div style={{display: "flex"}}>
                <h2> Gestión de asignaciones de ejercicios a olimpiadas </h2>

                <Button
                    variant="link"
                    size="lg"
                    className="me-2"
                    onClick={() => navigate("/admin/assignations/new")}
                >
                    Nueva asignación
                </Button>

            </div>
            <AssignationsList/>
        </Container>

    );
}
