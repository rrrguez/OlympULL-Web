import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByType } from "../../api/usersApi";
import { getAllOlympiads } from "../../api/olympiadsApi";
import { getItineraryByOlympiad } from "../../api/itinerariesApi";
import { getAllSchools } from "../../api/schoolsApi";
import { createParticipant } from "../../api/participantsApi";
import { toast } from "react-toastify";

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

    const [loadingItineraries, setLoadingItineraries] = useState(false);

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
            await createParticipant(formData);
            navigate("/admin/participants");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al crear la asignación");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadParticipants() {
            try {
                const data = await getUserByType("PARTICIPANT");
                setParticipants(data.data);
            } catch (err) {
                console.error("Error cargando la lista de participantes", err);
                toast.error("Error cargando la lista de participantes");
            }
        }
        loadParticipants();

        async function loadSchools() {
            try {
                const data = await getAllSchools();
                setSchools(data.data);
            } catch (err) {
                console.error("Error cargando escuelas", err);
                toast.error("Error cargando las escuelas");
            }
        }
        loadSchools();

        async function loadOlympiads() {
            try {
                const data = await getAllOlympiads();
                setOlympiads(data.data);
            } catch (err) {
                console.error("Error cargando olimpiadas", err);
                toast.error("Error cargando las olimpiadas");
            }
        }
        loadOlympiads();
    })

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
                            >
                            <option value="">-- Seleccione un participante --</option>
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
                            >
                            <option value="">-- Seleccione una escuela --</option>
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
                            >
                            <option value="">-- Seleccione una olimpiada --</option>
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
                                ? "-- Seleccione primero una olimpiada --"
                                : itineraries.length === 0
                                ? "No hay itinerarios disponibles"
                                : "-- Seleccione un itinerario --"}
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

