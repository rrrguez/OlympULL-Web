import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getItinerary, updateItinerary } from "../../api/itinerariesApi";
import { useEffect } from "react";
import { getAllOlympiads } from "../../api/olympiadsApi";

export default function EditItinerary() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [olympiads, setOlympiads] = useState([]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        olympiad: "",
    });

    function handleChange(e) {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getItinerary(id);
                const o = res.data;

                setFormData({
                    ...o,
                    oldId: o.id,
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar el itinerario");
                navigate("/admin/itinerary");
            }
        };

        load();
            async function loadOlympiads() {
            try {
                const data = await getAllOlympiads();
                setOlympiads(data.data);
            } catch (err) {
                console.error("Error cargando itinerarios", err);
                toast.error("Error cargando las olimpiadas");
            }
        }
        loadOlympiads();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await updateItinerary(id, formData);
            toast.success("Itinerario actualizado con éxito");
            navigate("/admin/itineraries");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al actualizar el itinerario");
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
                >
                    <option value="">-- Seleccione una olimpiada --</option>
                    {olympiads.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.id} - {o.name}
                    </option>
                    ))}
                </select>
                </div>
            </div>

            <div>
                <label className="form-label">Descripción</label>
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
                {loading ? "Editando..." : "Editar"}
                </button>
            </div>
        </form>
        </div>
    );
}
