import { useNavigate } from "react-router-dom";
import OlympULLButton from "../../components/buttons/OlympULLButton";

export default function OrganizerHome() {
    const username = localStorage.getItem("id");
    const navigate = useNavigate();
    return (
        <div className="container mt-5">
            <h1>¡Bienvenido, {username}!</h1>
            <h2 className="section-title">Gestiones</h2>
            <div className="grid-admin">
                <OlympULLButton
                    text="Gestión de itinerarios"
                    onClickAction={() => navigate("/organizer/assignations")}
                />
            </div>
        </div>
    );
}
