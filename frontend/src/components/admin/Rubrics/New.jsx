import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createRubric } from "../../../api/admin/rubricsApi";
import * as regex from "../../../utils/regex";

export default function NewRubric() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        points: "",
        labels: "",
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
            // Check if the description has the correct format
            if (!regex.descPattern.test(formData.description)) {
                throw {
                    type: "warn",
                    message:
                    `
                    La descripción contiene caracteres inválidos.
                    `
                };
            } else if (formData.description.length > 100) {
                throw {
                    type: "warn",
                    message:
                    `
                    La descripción debe tener un máximo de 100 caracteres.
                    `
                };
            }

            await createRubric(formData);
            navigate("/admin/rubrics");
            toast.success("Rúbrica '"  + formData.name + "' creada con éxito");
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            }
            toast.error(err.response?.data?.error || "Error al crear la rúbrica");
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
                            pattern={regex.namePattern}
                            onInvalid={e =>
                                e.target.setCustomValidity(regex.onInvalidName)
                            }
                            onInput={e => e.target.setCustomValidity("")}
                        />
                    </div>

                    <div>
                        <label className="form-label">Puntos</label>
                        <input
                            type="string"
                            name="points"
                            className="form-control"
                            value={formData.points}
                            onChange={handleChange}
                            required
                            pattern={regex.rubricPointsPattern}
                            onInvalid={e =>
                                e.target.setCustomValidity(regex.onInvalidRubricPoints)
                            }
                            onInput={e => e.target.setCustomValidity("")}
                        />
                    </div>

                    <div>
                        <label className="form-label">Etiquetas<span className="optional"> - Opcional</span></label>
                        <input
                            type="timestamp"
                            name="labels"
                            className="form-control"
                            value={formData.labels}
                            onChange={handleChange}
                            pattern={regex.rubricLabelsPattern}
                            onInvalid={e =>
                                e.target.setCustomValidity(regex.onInvalidRubricLabels)
                            }
                            onInput={e => e.target.setCustomValidity("")}
                        />
                    </div>
                </div>

                <div>
                    <label className="form-label">Descripción<span className="optional"> - Opcional</span></label>
                    <textarea
                        name="description"
                        className="form-control wide-description-field"
                        value={formData.description}
                        onChange={handleChange}
                        pattern={regex.descPattern}
                        onInvalid={e =>
                            e.target.setCustomValidity(regex.onInvalidDesc)
                        }
                        onInput={e => e.target.setCustomValidity("")}
                    ></textarea>
                </div>

                <div className="element-form">
                    <h1></h1>
                    <button className="new-button" disabled={loading}>
                        {loading ? "Creando..." : "Crear rúbrica"}
                    </button>
                </div>
            </form>
        </div>
    );
}
