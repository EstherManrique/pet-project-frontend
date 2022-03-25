import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ManagerReservationsTable from "../components/Manager/ManagerReservationsTable";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  let isManager = false;
  if(user) {
    const { roles } = user;
    isManager = roles.name === "Manager";
  }

  useEffect(() => {
    if (!isManager) {
      navigate("/");
    }
  }, [isManager, navigate]);

  return (
    <div className="mt-2"  style={{
      minHeight: '40rem'
    }}>
      <Container>
        <h2 className="mb-4">Manage Reservations</h2>
        <ManagerReservationsTable />
      </Container>
    </div>
  );
};

export default ManagerDashboard;
