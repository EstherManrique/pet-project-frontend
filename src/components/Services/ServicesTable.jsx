import React, { useState, useEffect, Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ServicesTable = () => {
  const [services, setServices] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const loadServices = async () => {
    await fetch("http://localhost:5000/api/services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data.services);
      });
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (id) {
      await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }).then((response) => {
        if (response.status === 200) {
          toast.success("🦄 Service deleted.");
          loadServices();
        } else if (response.status === 400) {
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
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => {
            return (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    href={`/admin/services/edit/${service._id}`}
                  >
                    <FaEdit />Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleDelete(service._id);
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
        <Button href="/admin/services/add">Add Service</Button>
      </div>
    </Fragment>
  );
};

export default ServicesTable;
