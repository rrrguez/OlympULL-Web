import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOlympiad, updateOlympiad } from "../../api/olympiadsApi";
import { toast } from "react-toastify";

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
            await updateOlympiad(id, formData);
            toast.success("Olimpiada actualizada con éxito");
            navigate("/admin/olympiads");
        } catch (err) {
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
            <label className="form-label">Zona horaria</label>
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
                <button className="new-button" disabled={loading}>
                    {loading ? "Editando..." : "Editar"}
                </button>
            </div>
        </form>
        </div>
    );
}
