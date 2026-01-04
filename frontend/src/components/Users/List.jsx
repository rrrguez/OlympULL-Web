import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { deleteUser, getAllUsers } from "../../api/usersApi";
import OlympULLIconButton from "../buttons/OlympULLIconButton";

export default function UsersList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        async function loadData() {
            setLoading(true);
            const res = await getAllUsers();
            setData(res.data);
            setLoading(false);
        }
        loadData();
    };

    const remove = async (id) => {
        await deleteUser(id);
        load();
    };

    return (
        <Container>
        <table className="table table-hover table-bordered">
            <thead>
            <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Tipo de usuario</th>
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
                <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.username}</td>
                <td>{o.type}</td>
                <td>
                    <div className="table-button-container">
                        <OlympULLIconButton
                            text="Editar"
                            buttonClass="table-button"
                            route="/admin/olympiads"
                            icon="fa-solid fa-pen-to-square"
                        />

                        <OlympULLIconButton
                            text="Eliminar"
                            buttonClass="table-button"
                            route="/admin/olympiads"
                            icon="fa-regular fa-trash-can"
                        />
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </Container>
    );
}
