import React, { useEffect, useState } from "react";
import { getAllRubrics, deleteRubric } from "../../api/rubricsApi";
import { Table, Button, Container } from "react-bootstrap";

export default function RubricList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllRubrics();
    setData(res.data);
  };

  const remove = async (id) => {
    await deleteRubric(id);
    load();
  };

  return (
    <Container className="mt-4">
      <h2>Rúbricas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Puntos</th>
            <th>Etiquetas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.description}</td>
              <td>{o.points}</td>
              <td>{o.labels}</td>
              <td>
                <div className="table-button-container">
                    <Button
                    variant="warning"
                    size="sm"
                    className="table-button"
                    onClick={() => console.log("Editar", o.id)}
                    >
                    Editar
                    </Button>

                    <Button
                    variant="danger"
                    size="sm"
                    className="table-button"
                    onClick={() => remove(o.id)}
                    >
                    Borrar
                    </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
