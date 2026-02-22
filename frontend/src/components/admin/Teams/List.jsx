import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { createTeam, deleteTeam, getAllTeams } from "../../../api/teamsApi";
import OlympULLIconButton from "../../buttons/OlympULLIconButton";

export default function TeamsList({refreshKey}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [refreshKey]);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllTeams();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id, name) => {
        try {
            await deleteTeam(id);
            toast.success("Equipo '" + name + "' eliminado con éxito");
            load();
        } catch (err) {
            toast.error(err)
        }
    };

    const duplicate = async (team) => {
        try {
            const newTeam = {
                ...team,
                id: team.id + "-copia",
                name: team.name + "-copia",
            };

            await createTeam(newTeam);
            toast.success("Equipo '" + team.name + "' duplicado con éxito");
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
                        <th>Nombre</th>
                        <th>Escuela</th>
                        <th>Olimpiada</th>
                        <th>Itinerario</th>
                        <th>Acciones</th>
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
                        <tr key={o.id}>
                        <td>{o.name}</td>
                        <td>
                            {o.school_name}
                            {o.school_town && ` (${o.school_town})`}
                        </td>
                        <td>{o.olympiad_name}</td>
                        <td>{o.itinerary_name}</td>
                        <td>
                            <div className="table-button-container with-duplicate">
                            <OlympULLIconButton
                                text="Duplicar"
                                title="Duplicar"
                                buttonClass="table-button"
                                onClick={() => duplicate(o)}
                                icon="fa-solid fa-clone"
                            />
                            <OlympULLIconButton
                                text="Editar"
                                title="Editar"
                                buttonClass="table-button"
                                route={`/admin/teams/edit/${o.id}`}
                                icon="fa-solid fa-pen-to-square"
                            />
                            <OlympULLIconButton
                                text="Eliminar"
                                title="Eliminar"
                                buttonClass="table-button"
                                onClick={() => remove(o.id, o.name)}
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
