import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../api/usersApi";
import { toast } from "react-toastify";
import PageHeader from "../components/layouts/PageHeader";

export default function ChangePasswordPage() {
    const username = localStorage.getItem("id");
    const [password, setPassword] = useState("");
    const [repeat_password, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    const backButtonRouteText = localStorage.type == "ADMIN" ? "/admin" : localStorage.type == "ORGANIZER" ? "/organizer" : "/monitor";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != repeat_password) {
            toast.error("Las contraseñas no coinciden");
        } else {
            await updateUserPassword(username, { password });
            toast.success("Contraseña actualizada con éxito")
            navigate(backButtonRouteText);
        }
    };

    return (
        <div>
        <PageHeader
            title={"Cambio de contraseña de " + localStorage.getItem("id")}
            backButtonRoute={backButtonRouteText}
        />

        <div className="password-container">
        <form className="password-form" onSubmit={handleSubmit}>
            <div>
                <div>
                <p className="form-label">Nueva contraseña</p>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <div>
                <p className="form-label">Repetir nueva contraseña</p>
                <input
                    type="password"
                    className="form-control"
                    value={repeat_password}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                />
                </div>
            </div>
            <button className="password-button">
            Cambiar contraseña
            </button>
        </form>
        </div>
    </div>
    );
}
