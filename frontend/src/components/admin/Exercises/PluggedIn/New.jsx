import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPluggedInExercise } from "../../../../api/admin/pluggedInExercisesApi";
import * as regex from "../../../../utils/regex";

export default function NewPluggedInExercise() {
    const navigate = useNavigate();

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
        input_files: null,
        output_files: null
    });

    const [loading, setLoading] = useState(false);

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

            if (Number(formData.inputs) > 0) {
                if (!formData.input_files) {
                    throw {
                        type: "warn",
                        message: "Se deben subir los archivos de entrada en formato ZIP."
                    };
                }

                if (!formData.output_files) {
                    throw {
                        type: "warn",
                        message: "Se deben subir los archivos de salida en formato ZIP."
                    };
                }
            }

            const fd = new FormData();
            fd.append("id", formData.id);
            fd.append("name", formData.name);
            fd.append("description", formData.description || "");
            fd.append("category", formData.category);
            fd.append("resources", formData.resources);
            fd.append("inputs", formData.inputs);
            console.log(formData.time_limit);
            if (formData.time_limit !== "" && formData.time_limit !== null) {
                fd.append("time_limit", formData.time_limit);
            }
            fd.append("testcase_value", formData.testcase_value);

            if (formData.wording_file) {
                fd.append("wording_file", formData.wording_file);
            }

            if (formData.input_files) {
                fd.append("input_files", formData.input_files);
            }

            if (formData.output_files) {
                fd.append("output_files", formData.output_files);
            }

            await createPluggedInExercise(fd);
            navigate("/admin/exercises");
            toast.success("Ejercicio '" + formData.name + "' creado con éxito");
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
                        className="form-control"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        pattern={regex.idPattern}
                        onInvalid={e =>
                            e.target.setCustomValidity(regex.onInvalidId)
                        }
                        onInput={e => e.target.setCustomValidity("")}
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
                        pattern={regex.numericPattern}
                        required
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
                    <input
                        className="form-control file-input"
                        type="file"
                        name="wording_file"
                        id="pdf-upload"
                        accept="application/pdf"
                        onChange={e =>
                            setFormData({
                                ...formData,
                                wording_file: e.target.files[0]
                            })
                        }
                        required
                    />
                </div>

                {Number(formData.inputs) > 0 && (
                    <>
                        <div>
                            <label className="form-label">Archivos de entrada (inputs)</label>
                            <input
                                type="file"
                                className="form-control file-input"
                                accept=".zip"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        input_files: e.target.files[0]
                                    })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Archivo de salida (outputs)</label>
                            <input
                                type="file"
                                className="form-control file-input"
                                accept=".zip"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        output_files: e.target.files[0]
                                    })
                                }
                                required
                            />
                        </div>
                    </>
                )}
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
                {loading ? "Creando..." : "Crear ejercicio"}
                </button>
            </div>
        </form>
        </div>
        </>
    );
}
