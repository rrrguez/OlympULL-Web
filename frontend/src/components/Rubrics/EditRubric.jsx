import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRubric, updateRubric } from "../../api/rubricsApi";
import { toast } from "react-toastify";

export default function EditOlympiad() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        points: "",
        labels: "",
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
                const res = await getRubric(id);
                const o = res.data;

                setFormData({
                    ...o,
                    oldId: o.id,
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar la rúbrica");
                navigate("/admin/rubrics");
            }
        };

        load();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await updateRubric(id, formData);
            toast.success("Rúbrica actualizada con éxito");
            navigate("/admin/rubrics");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al actualizar la rúbrica");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="element-container">
            <form onSubmit={handleSubmit}>

            <div className="element-form">
                <div>
                    <label className="form-label">Código</label>
                    <input
                        type="text"
                        name="id"
                        className="form-control"
                        value={formData.id}
                        onChange={handleChange}
                        required
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
                    <label className="form-label">Puntos</label>
                    <input
                        type="string"
                        name="points"
                        className="form-control"
                        value={formData.points}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="form-label">Etiquetas</label>
                    <input
                        type="timestamp"
                        name="labels"
                        className="form-control"
                        value={formData.labels}
                        onChange={handleChange}
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

