import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { deletePluggedInExercise, getAllPluggedInExercises } from "../../api/pluggedInExercisesApi";

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
              <th>Límite de tiempo</th>
              <th>Puntos por testcase</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.description}</td>
                <td>{translateCategory(o.category)}</td>
                <td>{o.resources}</td>
                <td>{o.inputs}</td>
                <td>{o.time_limit}</td>
                <td>{o.testcase_value}</td>
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
