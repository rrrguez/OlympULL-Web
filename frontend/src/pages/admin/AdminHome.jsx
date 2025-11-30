import { Link } from "react-router-dom";

export default function AdminHome() {
    const username = localStorage.getItem("username");
    console.log(username);
    return (
      <div className="container mt-5">
        <h1>¡Bienvenido, {username}!</h1>
        <p>Panel de administrador</p>
        <div className="mt-4 d-flex flex-column gap-3">

        <Link to="/admin/olympiads" className="btn btn-primary btn-lg">
          Gestión de olimpiadas
        </Link>

        <Link to="/admin/itineraries" className="btn btn-secondary btn-lg">
          Gestión de itinerarios
        </Link>

        <Link to="/admin/exercises" className="btn btn-success btn-lg">
          Gestión de ejercicios
        </Link>

      </div>
      </div>
    );
  }
