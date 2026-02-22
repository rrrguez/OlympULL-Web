import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getOlympiad, updateOlympiad } from "../../../api/admin/olympiadsApi";
import * as regex from "../../../utils/regex";

export default function EditOlympiad() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        year: "",
        start: "",
        stop: "",
        timezone: ""
    });

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

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getOlympiad(id);
                const o = res.data;

                setFormData({
                    ...o,
                    start: o.start?.slice(0, 16),
                    stop: o.stop?.slice(0, 16),
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar la olimpiada");
                navigate("/admin/olympiads");
            }
        };

        load();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
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
                throw {
                    type: "warn",
                    message:
                    `
                    La descripción contiene caracteres inválidos.
                    `
                };
            }

            await updateOlympiad(id, formData);
            toast.success("Olimpiada actualizada con éxito");
            navigate("/admin/olympiads");
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            }
            toast.error(err.response?.data?.error || "Error al actualizar la olimpiada");
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
                className="form-control read-only-field"
                value={formData.id}
                disabled
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
                    {loading ? "Editando..." : "Editar"}
                </button>
            </div>
        </form>
        </div>
    );
}
