import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../../api/usersApi";
import * as regex from "../../utils/regex";

export default function NewUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        username: "",
        password: "",
        type: "",
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        console.log(formData);

        try {
            await createUser(formData);
            navigate("/admin/users");
            toast.success("Usuario '" + formData.id + "' creado con éxito")
            } catch (err) {
            toast.error(err.response?.data?.error || "Error al crear el usuario");
            } finally {
            setLoading(false);
        }
    }

    return (
        <div className="element-container">
            <form onSubmit={handleSubmit}>

            <div className="element-form">
            <div>
            <label className="form-label">Usuario</label>
            <input
                type="text"
                name="id"
                className="form-control"
                value={formData.id}
                onChange={handleChange}
                required
                pattern={regex.idPattern}
                onInvalid={e =>
                    e.target.setCustomValidity(regex.onInvalidId)
                }
                onInput={e => e.target.setCustomValidity("")}
            />
            </div>
            <div>
            <label className="form-label">Nombre</label>
            <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                pattern={regex.idPattern}
                onInvalid={e =>
                    e.target.setCustomValidity(regex.onInvalidId)
                }
                onInput={e => e.target.setCustomValidity("")}
            />
            </div>

            <div>
            <label className="form-label">Contraseña</label>
            <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                pattern={regex.namePattern}
                onInvalid={e =>
                    e.target.setCustomValidity(regex.onInvalidName)
                }
                onInput={e => e.target.setCustomValidity("")}
            />
            </div>

            <div>
            <label className="form-label">Tipo de usuario</label>
            <select
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
                required
                id="category"
            >
                <option value="">-- Seleccionar --</option>
                <option value="ADMIN">Administrador</option>
                <option value="MONITOR">Monitor</option>
                <option value="ORGANIZER">Organizador</option>
                <option value="PARTICIPANT">Participante</option>
            </select>
            </div>
            </div>

            <div className="element-form">
                <h1/>
                <button className="new-button" disabled={loading}>
                    {loading ? "Creando..." : "Crear usuario"}
                </button>
            </div>
        </form>
        </div>
    );
}
