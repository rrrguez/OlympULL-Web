import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteAssignation, getAllAssignations } from "../../../../api/assignationsApi";
import OlympULLIconButton from "../../../buttons/OlympULLIconButton";

export default function ExerciseAssignationsList({refreshKey}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [refreshKey]);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllAssignations();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (exercise, olympiad, itinerary) => {
        try {
            await deleteAssignation(exercise, olympiad, itinerary);
            toast.success("Asignación eliminada con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    return (
        <Container>
            <div className="table-wrap">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Ejercicio</th>
                            <th>Olimpiada</th>
                            <th>Itinerario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                            {Array.from({ length: 4 }).map((_, j) => (
                                <td key={j}>
                                <div className="skeleton-cell"></div>
                                </td>
                            ))}
                            </tr>
                        ))
                        : data.map((o) => (
                        <tr key={`${o.exercise}-${o.olympiad}-${o.itinerary}`}>
                            <td>{o.exercise_name}</td>
                            <td>{o.olympiad_name}</td>
                            <td>{o.itinerary_name}</td>
                            <td>
                                <div className="table-button-container only-delete">
                                    <OlympULLIconButton
                                        text="Eliminar"
                                        title="Eliminar"
                                        buttonClass="table-button"
                                        onClick={() => remove(o.exercise, o.olympiad, o.itinerary)}
                                        icon="fa-regular fa-trash-can"
                                    />
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}
