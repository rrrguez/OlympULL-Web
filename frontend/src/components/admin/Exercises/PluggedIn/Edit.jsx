import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPluggedInExercise, updatePluggedInExercise } from "../../../../api/admin/pluggedInExercisesApi";
import * as regex from "../../../../utils/regex";
import OlympULLIconButton from "../../../buttons/OlympULLIconButton";

export default function EditPluggedInExercise() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        category: "",
        resources: "",
        inputs: null,
        time_limit: null,
        testcase_value: null,
        wording_file: null,
        input_files: [],
        output_files: []
    });

    const [showCurrentWording, setShowCurrentWording] = useState(true);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleFileChange = e => {
        setSelectedFile(e.target.files[0]);
    };

    function toggleWording() {
        setShowCurrentWording(prev => !prev);
    }

    useEffect(() => {
        if (!Number(formData.inputs) > 0) {
            setFormData(prev => ({
                ...prev,
                input_files: [],
                output_files: []
            }));
        }
    }, [formData.inputs]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            // Check if the description has the correct format
            if (!regex.descPattern.test(formData.description)) {
                throw {
                    type: "warn",
                    message:
                    `
                    La descripción contiene caracteres inválidos.
                    `
                };
            } else if (formData.description.length > 200) {
                throw {
                    type: "warn",
                    message:
                    `
                    La descripción debe tener un máximo de 100 caracteres.
                    `
                };
            }

            const expected = Number(formData.inputs);

            if (expected > 0) {
                if (formData.input_files.length !== expected) {
                    throw {
                        type: "warn",
                        message: `Se deben subir exactamente ${expected} archivos de entrada.`
                    };
                }

                if (formData.output_files.length !== expected) {
                    throw {
                        type: "warn",
                        message: `Se deben subir exactamente ${expected} archivos de salida.`
                    };
                }
            }

            const fd = new FormData();
            fd.append("id", formData.id);
            fd.append("name", formData.name);
            fd.append("description", formData.description);
            fd.append("category", formData.category);
            fd.append("resources", formData.resources);
            fd.append("inputs", formData.inputs);
            if (formData.time_limit !== "" && formData.time_limit !== null) {
                fd.append("time_limit", formData.time_limit);
            }
            fd.append("testcase_value", formData.testcase_value);

            if (selectedFile) {
                fd.append("wording_file", selectedFile);
            }

            formData.input_files.forEach(file => {
                fd.append("input_files", file);
            });

            formData.output_files.forEach(file => {
                fd.append("output_files", file);
            });

            await updatePluggedInExercise(id, fd);
            navigate("/admin/exercises");
            toast.success("Ejercicio '" + formData.name + "' actualizado con éxito");
        } catch (err) {
            if (err.type === "warn") {
                toast.warn(err.message);
                return;
            }
            //console.error("Error completo:", err);
            toast.error(err.response?.data?.error || "Error al crear el ejercicio");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getPluggedInExercise(id);
                const o = res.data;

                setFormData({
                    ...o,
                });
            } catch(err) {
                console.log(err);
                toast.error("Error al cargar el ejercicio");
                navigate("/admin/exercises");
            }
        };

        load();
    }, [id]);

    return (
        <>
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
                    <label className="form-label">Categoría</label>
                    <select
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        id="category"
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="ABSTRACTION">Abstracción</option>
                        <option value="ALGORITHMS">Algoritmos</option>
                        <option value="LOOPS">Bucles</option>
                        <option value="CONDITIONALS">Condicionales</option>
                        <option value="COMPOSITION">Composición</option>
                        <option value="FUNCTIONS">Funciones</option>
                        <option value="AI">Inteligencia artificial</option>
                        <option value="PATTERNS RECOGNITION">Reconocimiento de patrones</option>
                        <option value="SEQUENCES">Secuencias</option>
                        <option value="LOOPS AND SEQUENCES">Secuencias y bucles</option>
                        <option value="VARIABLES">Variables</option>
                        <option value="VARIABLES AND FUNCTIONS">Variables y funciones</option>
                        <option value="OTHER">Otro</option>
                    </select>
                </div>

                <div>
                    <label className="form-label">Recursos</label>
                    <input
                        type="text"
                        name="resources"
                        className="form-control"
                        value={formData.resources}
                        onChange={handleChange}
                        required
                        pattern={regex.resourcesPattern}
                        onInvalid={e =>
                            e.target.setCustomValidity(regex.onInvalidResources)
                        }
                        onInput={e => e.target.setCustomValidity("")}
                    />
                </div>
            </div>

            <div className="element-form">
                <div>
                    <label className="form-label">Número de inputs</label>
                    <input
                        type="number"
                        name="inputs"
                        className="form-control"
                        value={formData.inputs}
                        onChange={handleChange}
                        required
                        pattern={regex.numericPattern}
                        onInvalid={e =>
                            e.target.setCustomValidity(regex.onInvalidNumeric)
                        }
                        onInput={e => e.target.setCustomValidity("")}
                    />
                </div>

                <div>
                    <label className="form-label">Límite de tiempo (segundos)<span className="optional"> - Opcional</span></label>
                    <input
                        type="number"
                        name="time_limit"
                        className="form-control"
                        value={formData.time_limit}
                        onChange={handleChange}
                        pattern={regex.numericPattern}
                        onInvalid={e =>
                            e.target.setCustomValidity(regex.onInvalidNumeric)
                        }
                        onInput={e => e.target.setCustomValidity("")}
                    />
                </div>

                <div>
                    <label className="form-label">Puntos por cada testcase superado</label>
                    <input
                        type="number"
                        step="0.01"
                        name="testcase_value"
                        className="form-control"
                        value={formData.testcase_value}
                        onChange={handleChange}
                        required
                        pattern={regex.numericPattern}
                        onInvalid={e =>
                            e.target.setCustomValidity(regex.onInvalidNumeric)
                        }
                        onInput={e => e.target.setCustomValidity("")}
                    />
                </div>
                <div>
                    <label className="form-label">Enunciado</label>
                    {formData.wording_file && showCurrentWording ? (
                        <div className="wording-div">
                            <div className="current-wording">
                                <i className="fa-regular fa-file"/>
                                Enunciado actual:
                                <a
                                    href={`http://localhost:3000/uploads/wordings/${formData.wording_file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {formData.wording_file}
                                </a>
                            </div>
                            <OlympULLIconButton
                                text="Cambiar"
                                title="Cambiar"
                                type="button"
                                buttonClass="table-button"
                                onClick={toggleWording}
                                icon="fa-solid fa-arrows-rotate"
                            />
                        </div>
                    ) : (
                        <div className="wording-div">
                            <input
                                className="form-control file-input"
                                type="file"
                                id="pdf-upload"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                //required
                            />
                            {formData.wording_file ? (
                                <OlympULLIconButton
                                    text="Cancelar"
                                    title="Cancelar"
                                    type="button"
                                    buttonClass="table-button"
                                    onClick={toggleWording}
                                    icon="fa-solid fa-xmark"
                                />
                            ) : (<></>)}

                        </div>
                    )}

                </div>
                {Number(formData.inputs) > 0 ?
                    <>
                    <div>
                    <label className="form-label">Archivos de entrada (inputs) </label>
                        <input
                            type="file"
                            multiple
                            className="form-control file-input"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    input_files: Array.from(e.target.files)
                                })
                            }
                            accept=".txt"
                            required={Number(formData.inputs) > 0}
                        />
                    </div>
                    <div>
                    <label className="form-label">Archivos de salida (outputs)</label>
                        <input
                            type="file"
                            multiple
                            className="form-control file-output"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    output_files: Array.from(e.target.files)
                                })
                            }
                            accept=".txt"
                            required={Number(formData.inputs) > 0}
                        />
                    </div>
                    </>
                : ""}
            </div>
            <div>
            <label className="form-label">Descripción<span className="optional"> - Opcional</span></label>
            <textarea
                name="description"
                className="form-control wide-description-field"
                value={formData.description}
                onChange={handleChange}
            />
            </div>

            <div className="element-form">
                <h1></h1>
                <button className="new-button" disabled={loading}>
                {loading ? "Editando..." : "Editar ejercicio"}
                </button>
            </div>
        </form>
        </div>
        </>
    );
}
