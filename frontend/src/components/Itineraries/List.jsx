import React, { useEffect, useState } from "react";
import { getAllItineraries, deleteItinerary } from "../../api/itinerariesApi";
import { Table, Button, Container } from "react-bootstrap";

export default function ItinerariesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllItineraries();
    setData(res.data);
  };

  const remove = async (id) => {
    await deleteItinerary(id);
    load();
  };

  return (
    <Container className="mt-4">
      <h2>Itinerarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Olimpiada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.description}</td>
              <td>{o.olympiad}</td>
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
