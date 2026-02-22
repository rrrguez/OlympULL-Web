import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createItinerary } from "../../../api/admin/itinerariesApi";
import { getAllOlympiads } from "../../../api/admin/olympiadsApi";
import * as regex from "../../../utils/regex";

export default function NewItinerary() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        olympiad: "",
    });

    const [olympiads, setOlympiads] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingOlympiads, setLoadingOlympiads] = useState([]);

    const olympiadDisabled = olympiads.length === 0;

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        async function loadOlympiads() {
            try {
                setLoadingOlympiads(true);
                const data = await getAllOlympiads();
                setOlympiads(data.data);
            } catch (err) {
                console.error("Error cargando olimpiadas", err);
                toast.error("No se pudieron cargar las olimpiadas");
            } finally {
                setLoadingOlympiads(false);
            }
        }
        loadOlympiads();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            if (olympiadDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una olimpiada"
                }
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
            } else if (formData.description.length > 100) {
                throw {
                    type: "warn",
                    message:
                    `
                    La descripción debe tener un máximo de 100 caracteres.
                    `
                };
            }

            await createItinerary(formData);
            navigate("/admin/itineraries");
            toast.success("Itinerario '" + formData.name + "' creado con éxito");
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            }
            toast.error(err.response?.data?.error || "Error al crear el itinerario");
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
                <label className="form-label">Olimpiada</label>
                <select
                    name="olympiad"
                    className="form-control"
                    value={formData.olympiad}
                    onChange={handleChange}
                    required
                    disabled={olympiadDisabled}
                >
                    <option value="">
                        {loadingOlympiads ? "Cargando olimpiadas..." : olympiadDisabled ? "No hay olimpiadas disponibles" : "-- Selecciona una olimpiada --"
                        }
                    </option>
                    {olympiads.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.id} - {o.name}
                    </option>
                    ))}
                </select>
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
                <button type="submit" className="new-button" disabled={loading}>
                {loading ? "Creando..." : "Crear itinerario"}
                </button>
            </div>
        </form>
        </div>
    );
}
