import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getItineraryByOlympiad } from "../../../api/admin/itinerariesApi";
import { getAllOlympiads } from "../../../api/admin/olympiadsApi";
import { createOrganizer } from "../../../api/admin/organizersApi";
import { getUserByType } from "../../../api/admin/usersApi";

export default function NewOrganizerAssignation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        itinerary: "",
    });

    const [loading, setLoading] = useState(false);

    const [organizers, setOrganizers] = useState([]);
    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    const [loadingOrganizers, setLoadingOrganizers] = useState(false);
    const [loadingOlympiads, setLoadingOlympiads] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const organizerDisabled = loadingOrganizers|| organizers.length === 0;
    const olympiadDisabled = loadingOlympiads || olympiads.length === 0;
    const itineraryDisabled =
    !formData.olympiad || loadingItineraries || itineraries.length === 0;

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
            if (organizerDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un organizador"
                }
            }
            if (olympiadDisabled || itineraryDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una olimpiada y un itinerario"
                }
            }
            await createOrganizer(formData);
            navigate("/admin/organizers");
        } catch (err) {
            if (err.type === "warn") {
                toast.warning(err.message)
                return
            }
            toast.error(err.response?.data?.error || "Error al crear la asignación");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadOrganizers() {
            setLoadingOrganizers(true)
            try {
                const data = await getUserByType("ORGANIZER");
                setOrganizers(data.data);
            } catch (err) {
                console.error("Error cargando los organizadores", err);
                toast.error("Error cargando los organizadores");
            } finally {
                setLoadingOrganizers(false)
            }
        }
        loadOrganizers();
        async function loadOlympiads() {
            setLoadingOlympiads(true)
            try {
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
            console.error("Error cargando los itinerarios", err);
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
                        <label className="form-label">Organizador</label>
                        <select
                            name="id"
                            className="form-control"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            disabled={organizerDisabled}
                            >
                            <option value="">
                                {loadingOrganizers ?
                                "Cargando organizadores" :
                                organizerDisabled ?
                                "No hay organizadores disponibles" :
                                "-- Selecciona un organizador --"}
                            </option>
                            {organizers.map((o) => (
                                <option key={o.id} value={o.id}>
                                {o.id} - {o.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                    </div>
                    <div>
                        <label className="form-label">Olimpiada</label>
                        <select
                            name="olympiad"
                            className="form-control"
                            onChange={handleChange}
                            required
                            disabled={olympiadDisabled}
                            >
                            <option value="">
                                {loadingOlympiads ? "Cargando olimpiadas" : olympiadDisabled ? "No hay olimpiadas disponibles" : "-- Selecciona una olimpiada --"}
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
                        {loading ? "Creando..." : "Crear asignación"}
                    </button>
                </div>
            </form>
        </div>
    );
}

