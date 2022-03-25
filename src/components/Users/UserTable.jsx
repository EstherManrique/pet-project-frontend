import React, { useState, useEffect, Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ISODateString } from "../../utils/utils";


function UserTable() {
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const loadUsers = async () => {
    await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    loadUsers();
  });

  const handleDelete = async (id) => {
    if (id) {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }).then((response) => {
        if (response.status === 200) {
          toast.success("🦄 User deleted.");
          loadUsers();
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
            <th>Nombre</th>
            <th>Numbre Usuario</th>
            <th>Email</th>
            <th>Creado</th>
            <th>Rol</th>
            <th>Tienda</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{ISODateString(user.createdAt)}</td>
                <td>{user.roleId.name}</td>
                <td>
                  {user.hasOwnProperty("storeId") ? user.storeId.name : "-"}
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    href={`/admin/users/edit/${user._id}`}
                  >
                    <FaEdit />Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                   <FaTrashAlt />Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Button href="/admin/users/add">Add User</Button>
      </div>
    </Fragment>
  );
}

export default UserTable;
