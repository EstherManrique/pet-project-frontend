import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const ServiceForm = ({ ...props }) => {

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
    const url = id ? `http://localhost:5000/api/services/${id}` : 'http://localhost:5000/api/services';
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
            onClose: () => navigate('/admin/services')
          });
          
        } else {
          toast.error("HTTP status " + response.status);
        }
      });
  };

  const getService = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "GET"
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          toast.error("HTTP status " + response.status);
        }
      }).then((json) => {
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
    if(id) {
      getService(id)
    }
  }, [id])

  return (
    <Fragment>
      <h1>Section Services</h1>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
          <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Ingrese el nombre"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="description">Descripción</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              placeholder="Ingrese la descripción"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="price">Precio</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={price}
              placeholder="Ingrese el precio"
              onChange={onChange}
            />
          </div>
            <div className="form-group d-flex justify-content-between">
              <Button href="/admin/services" variant="light">Back</Button>
              <Button type="submit" variant='primary'>
                Submit
              </Button>
            </div>
        </form>
      </section>
    </Fragment>
  );
};

export default ServiceForm;
