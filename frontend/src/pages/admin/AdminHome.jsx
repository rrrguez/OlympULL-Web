import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    return (
      <div className="container mt-5">
        <h1>¡Bienvenido, {username}!</h1>
        <p>Panel de administrador</p>
        <div className="grid-admin">

        <Button
            variant="link"
            size="lg"
            className="me-2"
            onClick={() => navigate("/admin/olympiads")}
        >
            Gestión de olimpiadas
        </Button>

        <Button
            variant="link"
            size="lg"
            className="me-2"
            onClick={() => navigate("/admin/itineraries")}
        >
            Gestión de itinerarios
        </Button>

        <Button
            variant="link"
            size="lg"
            className="me-2"
            onClick={() => navigate("/admin/exercises")}
        >
            Gestión de ejercicios
        </Button>

        <Button
            variant="link"
            size="lg"
            className="me-2"
            onClick={() => navigate("/admin/rubrics")}
        >
            Gestión de rúbricas
        </Button>

        <Button
            variant="link"
            size="lg"
            className="me-2"
            onClick={() => navigate("/admin/assignations")}
        >
            Asignación de ejercicios a olimpiadas
        </Button>

      </div>
      </div>
    );
  }
