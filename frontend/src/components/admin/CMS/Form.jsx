import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllOlympiads } from "../../../api/admin/olympiadsApi";
import { deployToCms } from "../../../api/admin/cmsApi";

export default function CmsForm() {

    const [formData, setFormData] = useState({
        commandVariant: "",
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
            await deployToCms(formData.commandVariant, formData.olympiad);
            toast.success("Olimpiada '" + formData.name + "' creada en CMS con éxito");
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            } else {
                toast.error("Ha ocurrido un error inesperado");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="element-container">
            <form onSubmit={handleSubmit}>
            <div className="element-form">
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
                            {loadingOlympiads ? "Cargando olimpiadas..." : olympiadDisabled ? "No hay olimpiadas disponibles" : "-- Selecciona la olimpiada a importar --"
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
                    <label className="form-label">Acción</label>
                    <select
                        name="commandVariant"
                        className="form-control"
                        value={formData.commandVariant}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Selecciona una acción --</option>
                        <option value="updateContest">Actualizar olimpiada</option>
                        <option value="importContest">Importar olimpiada</option>
                        <option value="importUsers">Importar usuarios</option>
                    </select>
                </div>
            </div>
            <div className="element-form">
                <h1/>
                <button type="submit" className="new-button" disabled={loading}>
                {loading ? "Conectando..." : "Conectar con CMS"}
                </button>
            </div>
        </form>
        </div>
    );
}
