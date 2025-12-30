import OlympULLButton from "../../components/buttons/OlympULLButton";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AdminHome() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    return (
      <div className="container mt-5">
        <h1>¡Bienvenido, {username}!</h1>
        <h2>Gestión de olimpiadas</h2>
        <div className="grid-admin">

        <OlympULLButton
            text="Gestión de olimpiadas"
            buttonClass="me-2"
            route="/admin/olympiads"
        />

        <OlympULLButton
            text="Gestión de itinerarios"
            buttonClass="me-2"
            route="/admin/itineraries"
        />

        <OlympULLButton
            text="Gestión de rúbricas"
            buttonClass="me-2"
            route="/admin/rubrics"
        />

        <OlympULLButton
            text="Gestión de ejercicios"
            buttonClass="me-2"
            route="/admin/exercises"
        />

        <OlympULLButton
            text="Asignación de ejercicios a olimpiadas"
            buttonClass="me-2"
            route="/admin/assignations"
        />

      </div>

      <h2>Gestión de usuarios</h2>
      </div>
    );
  }
