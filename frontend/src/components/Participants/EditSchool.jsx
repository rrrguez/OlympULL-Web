import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSchool, updateSchool } from "../../api/schoolsApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EditSchool() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        town: ""
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
                const res = await getSchool(id);
                console.log(res);
                const o = res.data;

                setFormData({
                    ...o,
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar la escuela");
                navigate("/admin/schools");
            }
        };

        load();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await updateSchool(id, formData);
            toast.success("Escuela actualizada con éxito");
            navigate("/admin/schools");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error al actualizar la escuela");
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
                        />
                    </div>

                    <div>
                        <label className="form-label">Municipio</label>
                        <input
                            type="text"
                            name="town"
                            className="form-control"
                            value={formData.town}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="element-form">
                    <h1></h1>
                    <button className="new-button" disabled={loading}>
                        {loading ? "Editando..." : "Editar escuela"}
                    </button>
                </div>
            </form>
        </div>
    );
}
