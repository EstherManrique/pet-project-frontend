import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ServiceForm from "../../components/Services/ServiceForm";
import ServicesTable from "../../components/Services/ServicesTable";
import { Container } from "react-bootstrap";

const AdminServicesDashboard = ({ ...props }) => {

  const { id } = useParams();

  const { componentAction } = props;

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { roles } = user;
  const isAdmin = roles.name === "Administrator";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="mt-5">
      <Container>
      <h2>Administrate Services</h2>
        {
          {
            add: <ServiceForm />,
            list: <ServicesTable />,
            edit: <ServiceForm id={id} />,
          }[componentAction]
        }
      </Container>
    </div>
  );
};

export default AdminServicesDashboard;
