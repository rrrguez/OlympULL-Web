import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { getAllAssignations } from "../../api/assignationsApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";

export default function AssignationsList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllAssignations();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Ejercicio</th>
                    <th>Olimpiada</th>
                    <th>Itinerario</th>
                    <th>Acciones rápidas</th>
                    </tr>
                </thead>
                <tbody>
                    {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="skeleton-row">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <td key={j}>
                            <div className="skeleton-cell"></div>
                            </td>
                        ))}
                        </tr>
                    ))
                    : data.map((o) => (
                    <tr key={o.exercise}>
                        <td>{o.exercise}</td>
                        <td>{o.olympiad}</td>
                        <td>{o.itinerary}</td>
                        <td>
                            <div className="table-button-container">
                                <OlympULLIconButton
                                    text="Editar"
                                    buttonClass="table-button"
                                    route="/admin/rubrics"
                                    icon="fa-solid fa-pen-to-square"
                                />

                                <OlympULLIconButton
                                    text="Eliminar"
                                    buttonClass="table-button"
                                    route="/admin/rubrics"
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
