import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StoreForm from "../../components/Stores/StoreForm";
import StoresTable from "../../components/Stores/StoresTable";
import { Container } from "react-bootstrap";

const AdminStoresDashboard = ({ ...props }) => {

  const { id } = useParams();

  const { componentAction } = props;

  const navigate = useNavigate();

  let isAdmin = false;
  const { user } = useSelector((state) => state.auth);
  if(user) {
    const { roles } = user;
    isAdmin = roles.name === "Administrator";
  }

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="mt-2" style={{
      minHeight: '40rem'
    }}>
      <Container>
      <h2>Manage Stores</h2>
        {
          {
            add: <StoreForm />,
            list: <StoresTable />,
            edit: <StoreForm id={id} />,
          }[componentAction]
        }
      </Container>
    </div>
  );
};

export default AdminStoresDashboard;
