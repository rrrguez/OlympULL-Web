import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("username", username);
      // Redirección según tipo de usuario
      switch (data.type) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "ORGANIZER":
          navigate("/organizer");
          break;
        default:
          navigate("/public");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
    <h1 className="mb-4">Inicio de sesión</h1>

    <div className="login-container mt-5" style={{ maxWidth: "400px" }}>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
</div>
  );
}
