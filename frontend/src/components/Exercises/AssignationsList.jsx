import { getAllAssignations, getAssignationById, updateAssignation } from "../../api/assignationsApi";
import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";


export default function AssignationsList() {
    const [data, setData] = useState([]);

    useEffect(() => {
      load();
    }, []);

    const load = async () => {
      const res = await getAllAssignations();
      setData(res.data);
    };

    return (
      <Container className="mt-4">
        <h2>Asignationes de ejercicios a olimpiadas</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ejercicio</th>
              <th>Olympiada</th>
              <th>Itinerario</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr key={o.exercise}>
                <td>{o.exercise}</td>
                <td>{o.olympiad}</td>
                <td>{o.itinerary}</td>
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
                    onClick={() => console.log("Eliminar asignación")}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }

