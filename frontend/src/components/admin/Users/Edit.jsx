import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../../api/admin/usersApi";
import * as regex from "../../../utils/regex";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        username: "",
        password: "",
        type: ""
    });


    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await updateUser(id, formData);
            toast.success("Información del usuario actualizada con éxito");
            navigate("/admin/users");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al actualizar el usuario");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getUser(id);
                const o = res.data;

                setFormData({
                    ...o,
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar el usuario");
                navigate("/admin/users");
            }
        };

        load();
    }, [id]);

    return (
        <div className="element-container">
            <form onSubmit={handleSubmit}>

            <div className="element-form">
            <div>
            <label className="form-label">Usuario</label>
            <input
                type="text"
                name="id"
                className="form-control read-only-field"
                value={formData.id}
                onChange={handleChange}
                disabled
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
                    {loading ? "Editando..." : "Editar usuario"}
                </button>
            </div>
        </form>
        </div>
    );
}
