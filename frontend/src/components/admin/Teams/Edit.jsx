import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getItineraryByOlympiad } from "../../../api/itinerariesApi";
import { getAllOlympiads } from "../../../api/olympiadsApi";
import { getAllSchools } from "../../../api/schoolsApi";
import { getTeam, updateTeam } from "../../../api/teamsApi";
import * as regex from "../../../utils/regex";

export default function EditTeam() {
    const { id } = useParams();
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
            await updateTeam(id, formData);
            navigate("/admin/teams");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al crear el equipo");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadSchools() {
            try {
                const data = await getAllSchools();
                setSchools(data.data);
            } catch (err) {
                console.error("Error cargando las escuelas", err);
                toast.error("Error cargando las escuelas");
            }
        }
        loadSchools();

        async function loadOlympiads() {
            try {
            const data = await getAllOlympiads();
            setOlympiads(data.data);
            } catch (err) {
            console.error("Error cargando las olimpiadas", err);
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

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getTeam(id);
                const o = res.data;

                setFormData({
                    ...o,
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar el equipo");
                navigate("/admin/teams");
            }
        };

        load();
    }, [id]);

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
                            onChange={handleChange}
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
                        <label className="form-label">Escuela</label>
                        <select
                            name="school"
                            className="form-control"
                            value={formData.school}
                            onChange={handleChange}
                            required
                            >
                            <option value="">-- Selecciona una escuela --</option>
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
                            value={formData.olympiad}
                            onChange={handleChange}
                            required
                            >
                            <option value="">-- Selecciona una olimpiada --</option>
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
                        {loading ? "Editando..." : "Editar equipo"}
                    </button>
                </div>
            </form>
        </div>
    );
}
