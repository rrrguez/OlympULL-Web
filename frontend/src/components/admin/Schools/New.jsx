import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSchool } from "../../../api/admin/schoolsApi";
import * as regex from "../../../utils/regex";

export default function NewSchool() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        town: "",
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

        try {
            await createSchool(formData);
            navigate("/admin/schools");
            toast.success("Escuela '" + formData.name + "' creada con éxito");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al crear la escuela");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="element-container">
            <form onSubmit={handleSubmit}>
                <div className="element-form">
                    <div>
                        <label className="form-label">ID</label>
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
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            pattern={regex.schoolPattern}
                            onInvalid={e =>
                                e.target.setCustomValidity(regex.onInvalidExDesc)
                            }
                            onInput={e => e.target.setCustomValidity("")}
                        />
                    </div>

                    <div>
                        <label className="form-label">Municipio<span className="optional"> - Opcional</span></label>
                        <input
                            type="text"
                            name="town"
                            className="form-control"
                            value={formData.town}
                            onChange={handleChange}
                            pattern={regex.schoolPattern}
                            onInvalid={e =>
                                e.target.setCustomValidity(regex.onInvalidExDesc)
                            }
                            onInput={e => e.target.setCustomValidity("")}
                        />
                    </div>
                </div>

                <div className="element-form">
                    <h1></h1>
                    <button className="new-button" disabled={loading}>
                        {loading ? "Creando..." : "Crear escuela"}
                    </button>
                </div>
            </form>
        </div>
    );
}
