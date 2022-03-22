import React, { Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserForm from "../../components/Users/UserForm";
import UserTable from "../../components/Users/UserTable";
import { Container } from "react-bootstrap";

const AdminUsersDashboard = ({ ...props }) => {
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
    <Fragment>
      <Container>
      <h2>Administrator Users</h2>
        {
          {
            add: <UserForm />,
            list: <UserTable />,
            edit: <UserForm id={id} />,
          }[componentAction]
        }
      </Container>
    </Fragment>
  );
};

export default AdminUsersDashboard;
