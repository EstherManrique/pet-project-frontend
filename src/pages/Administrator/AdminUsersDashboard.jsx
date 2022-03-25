import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserForm from "../../components/Users/UserForm";
import UserTable from "../../components/Users/UserTable";
import { Container } from "react-bootstrap";

const AdminUsersDashboard = ({ ...props }) => {
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
      <h2>Manage Users</h2>
        {
          {
            add: <UserForm />,
            list: <UserTable />,
            edit: <UserForm id={id} />,
          }[componentAction]
        }
      </Container>
    </div>
  );
};

export default AdminUsersDashboard;
