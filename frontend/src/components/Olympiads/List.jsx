import React, { useEffect, useState } from "react";
import { getAllOlympiads, deleteOlympiad } from "../../api/olympiadsApi";
import { Table, Button, Container } from "react-bootstrap";

function getOlympiadStatusIcon(start, stop) {
    const now = new Date();
    const startDate = new Date(start);
    const stopDate = new Date(stop);

    if (now < startDate) {
      return (
        <i
          className="fa-regular fa-alarm-clock"
          title="Pendiente"
        />
      );
    }

    if (now >= startDate && now <= stopDate) {
      return (
        <i
          className="fa-solid fa-fire fa-fade"
          title="En curso"
        />
      );
    }

    return (
      <i
        className="fa-regular fa-circle-check"
        title="Finalizada"
      />
    );
  }


export default function OlympiadsList() {
  const [data, setData] = useState([]);

  console.log("Componente renderizado");

  useEffect(() => {
    load();
    console.log("useEffect ejecutado");
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
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Código</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Año</th>
            <th>Fecha y hora de inicio</th>
            <th>Fecha y hora de final</th>
            <th>Zona horaria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id}>
              <td>{getOlympiadStatusIcon(o.start, o.stop)}</td>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.description}</td>
              <td>{o.year}</td>
              <td>{o.start}</td>
              <td>{o.stop}</td>
              <td>{o.timezone}</td>
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
      </table>
    </Container>
  );
}
