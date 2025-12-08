import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { deletePluggedInExercise, getAllPluggedInExercises } from "../../api/pluggedInExercisesApi";

export default function PluggedInExercisesList() {
    const [data, setData] = useState([]);

    useEffect(() => {
      load();
    }, []);

    const load = async () => {
      const res = await getAllPluggedInExercises();
      setData(res.data);
    };

    const remove = async (id) => {
      await deletePluggedInExercise(id);
      load();
    };

    return (
      <Container className="mt-4">
        <h2>Ejercicios enchufados</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Recursos</th>
              <th>Número de inputs</th>
              <th>Límite de tiempo (segundos)</th>
              <th>Valor de cada testcase</th>
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
                <td>{o.inputs}</td>
                <td>{o.time_limit}</td>
                <td>{o.testcase_value}</td>
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
