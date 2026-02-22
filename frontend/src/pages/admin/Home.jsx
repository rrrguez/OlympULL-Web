import { useNavigate } from "react-router-dom";
import OlympULLButton from "../../components/buttons/OlympULLButton";

export default function AdminHome() {
    const username = localStorage.getItem("id");
    const navigate = useNavigate();
    return (
        <div className="container mt-5">
            <h1>¡Hola, {username}!</h1>
            <h2 className="section-title">Gestión de olimpiadas</h2>
            <div className="grid-admin">
                <OlympULLButton
                    text="Gestión de olimpiadas"
                    onClickAction={() => navigate("/admin/olympiads")}
                />

                <OlympULLButton
                    text="Gestión de itinerarios"
                    onClickAction={() => navigate("/admin/itineraries")}
                />

                <OlympULLButton
                    text="Gestión de rúbricas"
                    onClickAction={() => navigate("/admin/rubrics")}
                />

                <OlympULLButton
                    text="Gestión de ejercicios"
                    onClickAction={() => navigate("/admin/exercises")}
                />

                <OlympULLButton
                    text="Gestión de escuelas"
                    onClickAction={() => navigate("/admin/schools")}
                />

                <OlympULLButton
                    text="Gestión de equipos"
                    onClickAction={() => navigate("/admin/teams")}
                />

                <OlympULLButton
                    text="Asignación de ejercicios a olimpiadas"
                    onClickAction={() => navigate("/admin/assignations/")}
                />
            </div>

            <h2 className="section-title">Gestión de usuarios</h2>
            <div className="grid-admin">
                <OlympULLButton
                    text="Gestión de cuentas de usuario"
                    onClickAction={() => navigate("/admin/users")}
                />
                <OlympULLButton
                    text="Gestión de monitores"
                    onClickAction={() => navigate("/admin/monitors")}
                />
                <OlympULLButton
                    text="Gestión de organizadores"
                    onClickAction={() => navigate("/admin/organizers")}
                />
                <OlympULLButton
                    text="Gestión de participantes"
                    onClickAction={() => navigate("/admin/participants")}
                />
            </div>
            <h2 className="section-title">Otras gestiones</h2>
            <div className="grid-admin">
                <OlympULLButton
                    text="Conexión con CMS"
                    onClickAction={() => navigate("admin/cms")}
                />
            </div>
        </div>
    );
}
