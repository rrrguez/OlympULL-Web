import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOlympiad } from "../../../api/olympiadsApi";
import { toast } from "react-toastify";
import * as regex from "../../../utils/regex";

export default function NewOlympiad() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        year: "",
        start: "",
        stop: "",
        timezone: "",
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    const handleStartDateChange = (e) => {
        const value = e.target.value;

        const newFormData = {
            ...formData,
            start: value
        };

        if (!isNaN(e.target.valueAsNumber)) {
            const date = new Date(e.target.valueAsNumber);
            newFormData.year = date.getFullYear();
        } else {
            newFormData.year = "";
        }

        setFormData(newFormData);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Check if the dates are correct
            const start = new Date(formData.start);
            const stop  = new Date(formData.stop);
            const startYear = start.getFullYear();
            const stopYear  = stop.getFullYear();
            if (start > stop) {
                throw {
                    type: "warn",
                    message: "La fecha de comienzo no puede ser posterior a la fecha de fin"
                };
            }

            if (startYear < 1900 || startYear > 2200 || isNaN(startYear)) {
                throw {
                    type: "warn",
                    message: "Año de comienzo no válido"
                };
            }
            if (stopYear < 1900 || stopYear > 2200 || isNaN(stopYear)) {
                throw {
                    type: "warn",
                    message: "Año de fin no válido"
                };
            }

            // Check if the description has the correct format
            if (!regex.descPattern.test(formData.description)) {
                toast.warn(
                    `
                    La descripción contiene caracteres inválidos.
                    `
                );
                return;
            }

            await createOlympiad(formData);
            toast.success("Olimpiada '" + formData.name + "' creada con éxito");
            navigate("/admin/olympiads");
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            }
            if (err.response?.data?.code === '23505') {
                toast.error(err.response?.data?.error);
            } else {
                toast.error("Ha ocurrido un error inesperado");
            }
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
            <label className="form-label">Año</label>
            <input
                type="number"
                name="year"
                className="form-control read-only-field"
                value={formData.year}
                readOnly
            />
            </div>

            <div>
            <label className="form-label">Zona horaria<span className="optional"> - Opcional</span></label>
            <input
                type="text"
                name="timezone"
                className="form-control"
                value={formData.timezone}
                onChange={handleChange}
            />
            </div>

            <div>
            <label className="form-label">Fecha de comienzo</label>
            <input
                type="datetime-local"
                name="start"
                className="form-control"
                value={formData.start}
                onChange={handleStartDateChange}
                required
            />
            </div>

            <div>
            <label className="form-label">Fecha de fin</label>
            <input
                type="datetime-local"
                name="stop"
                className="form-control"
                value={formData.stop}
                onChange={handleChange}
                required
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
            ></textarea>
            </div>

            <div className="element-form">
                <h1/>
                <button className="new-button" disabled={loading}>
                    {loading ? "Creando..." : "Crear olimpiada"}
                </button>
            </div>
        </form>
        </div>
    );
}
