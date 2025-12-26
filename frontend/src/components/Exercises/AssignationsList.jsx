import { getAllAssignations } from "../../api/assignationsApi";
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr key={o.exercise}>
                <td>{o.exercise}</td>
                <td>{o.olympiad}</td>
                <td>{o.itinerary}</td>
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

