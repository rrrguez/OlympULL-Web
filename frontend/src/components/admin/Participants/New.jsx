import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getItineraryByOlympiad } from "../../../api/itinerariesApi";
import { getAllOlympiads } from "../../../api/olympiadsApi";
import { createParticipant } from "../../../api/participantsApi";
import { getAllSchools } from "../../../api/schoolsApi";
import { getUserByType } from "../../../api/usersApi";

export default function NewParticipantAssignation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        school: "",
        itinerary: "",
    });

    const [loading, setLoading] = useState(false);

    const [participants, setParticipants] = useState([]);
    const [schools, setSchools] = useState([]);
    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const [loadingSchools, setLoadingSchools] = useState(false);
    const [loadingOlympiads, setLoadingOlympiads] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);

    const participantDisabled = loadingParticipants || participants.length === 0;
    const schoolDisabled = loadingSchools || schools.length === 0;
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
            if (participantDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar un participante"
                }
            }
            if (schoolDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una escuela"
                }
            }
            if (olympiadDisabled || itineraryDisabled) {
                throw {
                    type: "warn",
                    message: "Se debe seleccionar una olimpiada y un itinerario"
                }
            }
            await createParticipant(formData);
            navigate("/admin/participants");
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
        async function loadParticipants() {
            try {
                setLoadingParticipants(true)
                const data = await getUserByType("PARTICIPANT");
                setParticipants(data.data);
            } catch (err) {
                console.error("Error cargando la lista de participantes", err);
                toast.error("Error cargando la lista de participantes");
            } finally {
                setLoadingParticipants(false)
            }
        }
        loadParticipants();

        async function loadSchools() {
            try {
                setLoadingSchools(true)
                const data = await getAllSchools();
                setSchools(data.data);
            } catch (err) {
                console.error("Error cargando escuelas", err);
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
                console.error("Error cargando olimpiadas", err);
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
                        <label className="form-label">Participante</label>
                        <select
                            name="id"
                            className="form-control"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            disabled={participantDisabled}
                            >
                            <option value="">
                                {loadingParticipants ? "Cargando participantes..." : participantDisabled ? "No hay participantes disponibles" : "-- Selecciona un participante --"}
                            </option>
                            {participants.map((o) => (
                                <option key={o.id} value={o.id}>
                                {o.id} - {o.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">Escuela</label>
                        <select
                            name="school"
                            className="form-control"
                            onChange={handleChange}
                            required
                            disabled={schoolDisabled}
                            >
                            <option value="">
                                {loadingSchools ? "Cargando escuelas..." : schoolDisabled ? "No hay escuelas disponibles" : "-- Selecciona una escuela --"}
                            </option>
                            {schools.map((o) => (
                                <option key={o.id} value={o.id}>
                                {o.id} - {o.name}
                                </option>
                            ))}
                        </select>
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
                                {loadingOlympiads ? "Cargando olimpiadas..." : olympiadDisabled ? "No hay olimpiadas disponibles" : "-- Selecciona una olimpiada --"}
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

