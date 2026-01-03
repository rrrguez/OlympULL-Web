import OlympULLButton from "../../components/buttons/OlympULLButton";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AdminHome() {
    const username = localStorage.getItem("username");
    return (
      <div className="container mt-5">
        <h1>¡Bienvenido, {username}!</h1>
        <h2>Gestión de olimpiadas</h2>
        <div className="grid-admin">

        <OlympULLButton
            text="Gestión de olimpiadas"
            route="/admin/olympiads"
        />

        <OlympULLButton
            text="Gestión de itinerarios"
            route="/admin/itineraries"
        />

        <OlympULLButton
            text="Gestión de rúbricas"
            route="/admin/rubrics"
        />

        <OlympULLButton
            text="Gestión de ejercicios"
            route="/admin/exercises"
        />

        <OlympULLButton
            text="Asignación de ejercicios a olimpiadas"
            route="/admin/assignations"
        />

      </div>

      <h2>Gestión de usuarios</h2>
      </div>
    );
  }
