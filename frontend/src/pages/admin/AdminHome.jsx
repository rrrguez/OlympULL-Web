import OlympULLButton from "../../components/buttons/OlympULLButton";

export default function AdminHome() {
    const username = localStorage.getItem("id");
    return (
        <div className="container mt-5">
            <h1>¡Bienvenido, {username}!</h1>
            <h2 className="section-title">Gestión de olimpiadas</h2>
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
                    route="/admin/assignations/olympiads"
                />
            </div>

            <h2 className="section-title">Gestión de usuarios</h2>
            <div className="grid-admin">
                <OlympULLButton
                    text="Gestión de usuarios"
                    route="/admin/users"
                />
                <OlympULLButton
                    text="Gestión de equipos"
                    route="/admin/teams"
                />
                <OlympULLButton
                    text="Asignación de itinerarios a organizadores"
                    route="/admin/assignations/organizers"
                />
                <OlympULLButton
                    text="Asignación de ejercicios a monitores"
                    route="/admin/assignations/monitors"
                />
            </div>
        </div>
    );
  }
