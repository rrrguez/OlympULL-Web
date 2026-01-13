import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../api/usersApi";

export default function ChangePasswordPage() {
    const username = localStorage.getItem("id");
    const [password, setPassword] = useState("");
    const [repeat_password, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != repeat_password) {
            console.log("Las contraseñas no coinciden");
        } else {
            console.log(password);
            await updateUserPassword(username, { password });
            if (localStorage.type == "ADMIN") navigate("/admin");
            if (localStorage.type == "ORGANIZER") navigate("/organizer");
            if (localStorage.type == "MONITOR") navigate("/monitor");
        }
    };

    return (
        <div>
        <h1>Cambio de contraseña de {username}</h1>

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
