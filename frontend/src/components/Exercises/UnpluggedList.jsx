import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { deleteUnpluggedExercise, getAllUnpluggedExercises } from "../../api/unpluggedExercisesApi";
import OlympULLIconButton from "../../components/buttons/OlympULLIconButton";

function translateCategory(category) {
    if (category == 'ABSTRACTION') {
        return "Abstracción";
    } else if (category == 'ALGORITHMS') {
        return "Algoritmos";
    } else if (category == 'LOOPS') {
        return "Bucles";
    } else if (category == 'CONDITIONALS') {
        return "Condicionales";
    } else if (category == 'COMPOSITION') {
        return "Composición";
    } else if (category == 'FUNCTIONS') {
        return "Funciones";
    } else if (category == 'AI') {
        return "Inteligencia Artificial";
    } else if (category == 'PATTERNS RECOGNITION') {
        return "Reconocimiento de patrones";
    } else if (category == 'SEQUENCES') {
        return "Secuencias";
    } else if (category == 'LOOPS AND SEQUENCES') {
        return "Secuencias y bucles";
    } else if (category == 'VARIABLES') {
        return "Variables";
    } else if (category == 'VARIABLES AND FUNCTIONS') {
        return "Variables y funciones";
    } else {
        return "Otro";
    }
}

export default function UnpluggedExercisesList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllUnpluggedExercises();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id) => {
        await deleteUnpluggedExercise(id);
        load();
    };

    return (
        <Container>
            <h2>Ejercicios desenchufados</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Recursos</th>
                    <th>Rúbrica</th>
                    <th>Acciones rápidas</th>
                </tr>
                </thead>
                <tbody>
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                            {Array.from({ length: 7 }).map((_, j) => (
                                <td key={j}>
                                <div className="skeleton-cell"></div>
                                </td>
                            ))}
                            </tr>
                        ))
                        : data.map((o) => (
                            <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.description}</td>
                    <td>{translateCategory(o.category)}</td>
                    <td>{o.resources}</td>
                    <td>{o.rubric}</td>
                    <td>
                        <div className="table-button-container">
                            <OlympULLIconButton
                                text="Editar"
                                buttonClass="table-button"
                                route="/admin/exercises"
                                icon="fa-solid fa-pen-to-square"
                            />

                            <OlympULLIconButton
                                text="Eliminar"
                                buttonClass="table-button"
                                route="/admin/exercises"
                                icon="fa-regular fa-trash-can"
                            />
                        </div>
                    </td>
                    </tr>
                    ))}
                    </tbody>
            </Table>
        </Container>
    );
}
