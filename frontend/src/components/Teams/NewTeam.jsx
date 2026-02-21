import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getItineraryByOlympiad } from "../../api/itinerariesApi";
import { getAllOlympiads } from "../../api/olympiadsApi";
import { getAllSchools } from "../../api/schoolsApi";
import { createTeam } from "../../api/teamsApi";
import * as regex from "../../utils/regex";

export default function NewTeam() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        school: "",
        itinerary: "",
    });

    const [loading, setLoading] = useState(false);

    const [schools, setSchools] = useState([]);
    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    const [loadingSchools, setLoadingSchools] = useState(false);
    const [loadingOlympiads, setLoadingOlympiads] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const disabledSchools = schools.length === 0;
    const disabledOlympiads = olympiads.length === 0;
    const itineraryDisabled =
    !formData.olympiad || loadingItineraries || itineraries.length === 0

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
            if (disabledSchools) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una escuela"
                }
            }
            if (disabledOlympiads || itineraryDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una olimpiada y un itinerario"
                }
            }
            await createTeam(formData);
            navigate("/admin/teams");
            toast.success("Equipo '" + formData.name + "' creado con éxito")
        } catch (err) {
            if (err.type === "warn") {
                toast.warning(err.message)
                return
            }
            toast.error(err.response?.data?.error || "Error al crear el equipo");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadSchools() {
            try {
                setLoadingSchools(true)
                const data = await getAllSchools();
                setSchools(data.data);
            } catch (err) {
                console.error("Error cargando las escuelas", err);
                toast.error("Error cargando las escuelas");
            } finally {
                setLoadingSchools(false)
            }
        }
        loadSchools();

        async function loadOlympiads() {
            try {
                setLoadingOlympiads(true)
                const data = await getAllOlympiads();
                setOlympiads(data.data);
            } catch (err) {
                console.error("Error cargando las olimpiadas", err);
                toast.error("Error cargando las olimpiadas");
            } finally {
                setLoadingOlympiads(false)
            }
        }
        loadOlympiads();
    }, [])

    async function loadItineraries(olympiadId) {
        try {
            setLoadingItineraries(true);
            const res = await getItineraryByOlympiad(olympiadId);
            setItineraries(res.data);
        } catch (err) {
            console.error("Error cargando itinerarios", err);
            toast.error("Error cargando los itinerarios");
        } finally {
            setLoadingItineraries(false);
        }
    }

    useEffect(() => {
        if (formData.olympiad) {
        loadItineraries(formData.olympiad);
        setFormData(prev => ({ ...prev, itinerary: "" }));
        } else {
        setItineraries([]);
        }
    }, [formData.olympiad]);

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
                        <label className="form-label">Escuela</label>
                        <select
                            name="school"
                            className="form-control"
                            value={formData.school}
                            onChange={handleChange}
                            required
                            disabled={disabledSchools}
                            >
                            <option value="">
                                {
                                    loadingSchools ? "Cargando escuelas..." : disabledSchools ? "No hay escuelas disponibles" : "-- Selecciona una escuela --"
                                }
                            </option>
                            {schools.map((o) => (
                                <option key={o.id} value={o.id}>
                                    {o.id} - {o.name}
                                    {o.town && ` (${o.town})`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Olimpiada</label>
                        <select
                            name="olympiad"
                            className="form-control"
                            value={formData.olympiad}
                            onChange={handleChange}
                            required
                            disabled={disabledOlympiads}
                            >
                            <option value="">
                                {
                                    loadingOlympiads ? "Cargando olimpiadas..." : disabledOlympiads ? "No hay olimpiadas disponibles" : "-- Selecciona una olimpiada --"
                                }
                            </option>
                            {olympiads.map((o) => (
                                <option key={o.id} value={o.id}>
                                {o.id} - {o.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Itinerario</label>
                        <select
                            name="itinerary"
                            className="form-control"
                            value={formData.itinerary}
                            onChange={handleChange}
                            disabled={itineraryDisabled}
                            required
                        >
                            <option value="">
                                {loadingItineraries
                                ? "Cargando itinerarios..."
                                : !formData.olympiad
                                ? "-- Selecciona primero una olimpiada --"
                                : itineraries.length === 0
                                ? "No hay itinerarios disponibles"
                                : "-- Selecciona un itinerario --"}
                            </option>

                            {itineraries.map((i) => (
                                <option key={i.id} value={i.id}>
                                {i.id} - {i.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="element-form">
                    <h1></h1>
                    <button className="new-button" disabled={loading}>
                        {loading ? "Creando..." : "Crear equipo"}
                    </button>
                </div>
            </form>
        </div>
    );
}
