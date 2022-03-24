import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReservationForm from "../components/Reservations/ReservationForm";
import { Container } from "react-bootstrap";

const Reservations = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div style={{
      minHeight: '50rem'
    }}>
      <Container>
        <h2>Reservations</h2>
        <ReservationForm />
      </Container>
    </div>
  );
};

export default Reservations;
