import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaCheck, FaBan } from "react-icons/fa";

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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Pet Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Client Phone</th>
            <th>Store</th>
            <th>Service</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            return (
              <tr key={reservation._id}>
                <td>{reservation.clientId.name}</td>
                <td>{reservation.petName}</td>
                <td>{reservation.date}</td>
                <td>
                  <span style={{
                    color: reservation.status === 'confirmed' ? 'green' : (reservation.status === 'canceled' ? 'red' : '')
                  }}>
                  {reservation.status}
                  </span>
                </td>
                <td>{reservation.clientPhone}</td>
                <td>{reservation.storeId.name}</td>
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
