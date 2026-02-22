import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
    document.body.style.cursor = "default";
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const data = await login(id, password);
        localStorage.setItem("id", id);
        // Redirección según tipo de usuario
        switch (data.type) {
            case "ADMIN":
                navigate("/admin");
                break;
            case "ORGANIZER":
                navigate("/organizer");
                break;
            case "MONITOR":
                navigate("/monitor");
                break;
            default:
                navigate("/public");
        }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            <h1>Inicio de sesión</h1>

            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <p className="form-label">Usuario</p>
                            <input
                                type="text"
                                className="form-control"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <p className="form-label">Contraseña</p>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className="login-button">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
