import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaCheck, FaBan } from "react-icons/fa";
import { ISODateString } from "../../utils/utils";

const ManagerReservationsTable = () => {
  const [reservations, setReservations] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const loadReservations = async () => {
    await fetch("http://localhost:5000/api/reservations/" + user.store._id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReservations(data.reservations);
      });
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleConfirm = async (id, status) => {
    if (id) {
      await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({
          status: status,
        }),
      }).then((response) => {
        if (response.status === 200) {
          toast.success("Reservation " + status + ".");
          loadReservations();
        } else if(response.status === 400) {
          toast.error("Form fields error, please check");
        } else {
          toast.error("HTTP status " + response.status);
        }
      });
    } else {
      toast.error("Not valid ID");
    }
  };
  
  return (
    <Fragment>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ciente</th>
            <th>Mascota</th>
            <th>Fecha</th>
            <th>Estatus</th>
            <th>Teléfono</th>
            {/* <th>Store</th> */}
            <th>Servicio</th>
            <th>Operación</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            return (
              <tr key={reservation._id}>
                <td>{reservation.clientId.name}</td>
                <td>{reservation.petName}</td>
                <td>{ISODateString(reservation.date)}</td>
                <td>
                  <span style={{
                    color: reservation.status === 'confirmed' ? 'green' : (reservation.status === 'canceled' ? 'red' : '')
                  }}>
                  {reservation.status}
                  </span>
                </td>
                <td>{reservation.clientPhone}</td>
                {/* <td>{reservation.storeId.name}</td> */}
                <td>{reservation.serviceId.name}</td>
                <td>
                  {reservation.status !== "confirmed" && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        handleConfirm(reservation._id, "confirmed");
                      }}
                    >
                      <FaCheck /> Confirm
                    </Button>
                  )}
                  {' '}
                  {reservation.status !== "canceled" && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        handleConfirm(reservation._id, "canceled");
                      }}
                    >
                      <FaBan /> Cancel
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ManagerReservationsTable;
