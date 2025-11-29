import React, { useEffect, useState } from "react";
import { getAllExercises, deleteExercise } from "../../api/exercisesApi";
import { Table, Button, Container } from "react-bootstrap";

export default function ExercisesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllExercises();
    setData(res.data);
  };

  const remove = async (id) => {
    await deleteExercise(id);
    load();
  };

  return (
    <Container className="mt-4">
      <h2>Ejercicios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Olimpiada</th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.description}</td>
              <td>{o.category}</td>
              <td>{o.resources}</td>
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
