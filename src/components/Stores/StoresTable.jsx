import React, { useState, useEffect, Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const StoresTable = () => {
  const [stores, setStores] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const loadStores = async () => {
    await fetch("http://localhost:5000/api/stores")
      .then((response) => response.json())
      .then((data) => {
        setStores(data.stores);
      });
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleDelete = async (id) => {
    if (id) {
      await fetch(`http://localhost:5000/api/stores/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }).then((response) => {
        if (response.status === 200) {
          toast.success("🦄 Store deleted.");
          loadStores();
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
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => {
            return (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>{store.email}</td>
                <td>{store.phone}</td>
                <td>{store.location}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    href={`/admin/stores/edit/${store._id}`}
                  >
                    <FaEdit />Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleDelete(store._id);
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
        <Button href="/admin/stores/add">Add Store</Button>
      </div>
    </Fragment>
  );
};

export default StoresTable;
