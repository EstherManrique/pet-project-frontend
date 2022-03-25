import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

const ServiceForm = ({ ...props }) => {
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();

  const { id } = props;

  const { user } = useSelector((state) => state.auth);

  const formDefault = {
    name: "",
    description: "",
    price: "",
  };

  const [formData, setFormData] = useState(formDefault);

  const { name, description, price } = formData;

  const saveService = async (data) => {
    const url = id
      ? `http://localhost:5000/api/services/${id}`
      : "http://localhost:5000/api/services";
    await fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("🦄 Service saved.", {
            autoClose: 1000,
            onClose: () => navigate("/admin/services"),
          });
        } else if (response.status === 400) {
          return response.json();
        } else {
          toast.error("HTTP status " + response.status);
        }
      })
      .then((json) => {
        if (typeof json !== 'undefined' && json.hasOwnProperty("error")) {
          setFormErrors(json.error);
        }
      });
  };

  const getService = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          toast.error("HTTP status " + response.status);
        }
      })
      .then((json) => {
        const { name, description, price } = json.service;
        setFormData({
          name,
          description,
          price,
        });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      name,
      description,
      price,
    };
    saveService(serviceData);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (id) {
      getService(id);
    }
  }, [id]);

  return (
    <Fragment>
      {formErrors.length > 0 && (
        <Alert variant="danger" dismissible onClose={() => setFormErrors([])}>
          {formErrors.map((error, index) => {
            return <p key={index}>{error.msg}</p>;
          })}
        </Alert>
      )}
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Service Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter the service name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Service Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              placeholder="Enter Service Description"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Service Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={price}
              placeholder="Enter precio"
              onChange={onChange}
            />
          </div>
          <div className="form-group d-flex justify-content-between">
            <Button href="/admin/services" variant="light">
              Back
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default ServiceForm;
