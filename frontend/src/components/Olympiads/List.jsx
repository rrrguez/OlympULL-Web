import React, { useEffect, useState } from "react";
import { getAllOlympiads, deleteOlympiad } from "../../api/olympiadsApi";
import { Table, Button, Container } from "react-bootstrap";

export default function OlympiadsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllOlympiads();
    setData(res.data);
  };

  const remove = async (id) => {
    await deleteOlympiad(id);
    load();
  };

  return (
    <Container className="mt-4">
      <h2>Olimpiadas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.description}</td>
              <td>{o.year}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => console.log("Editar", o.id)}
                >
                  Editar
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => remove(o.id)}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
