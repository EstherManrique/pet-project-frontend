import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const StoreForm = ({ ...props }) => {
  const navigate = useNavigate();

  const { id } = props;

  const { user } = useSelector((state) => state.auth);

  const formDefault = {
    name: "",
    address: "",
    email: "",
    phone: "",
    location: "",
  };

  const [formData, setFormData] = useState(formDefault);

  const { name, address, email, phone, location } = formData;

  const saveStore = async (data) => {
    const url = id
      ? `http://localhost:5000/api/stores/${id}`
      : "http://localhost:5000/api/stores";
    await fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        toast.success("🦄 Store saved.", {
          autoClose: 1000,
          onClose: () => navigate("/admin/stores"),
        });
      } else if(response.status === 400) {
        toast.error("Form fields error, please check");
      } else {
        toast.error("HTTP status " + response.status);
      }
    });
  };

  const getStore = async (id) => {
    await fetch(`http://localhost:5000/api/stores/${id}`, {
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
        const { name, address, email, phone, location } = json.store;
        setFormData({
          name,
          address,
          email,
          phone,
          location,
        });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const storeData = {
      name,
      address,
      email,
      phone,
      location,
    };
    saveStore(storeData);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (id) {
      getStore(id);
    }
  }, [id]);

  return (
    <Fragment>
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
              placeholder="Ingrese el nombre de la tienda"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              placeholder="Ingrese la dirección de la tienda"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Ingrese el email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Ingrese el número de teléfono"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="location">Ubicación</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              placeholder="Ingrese la ubicación"
              onChange={onChange}
            />
          </div>
          <div className="form-group d-flex justify-content-between">
            <Button href="/admin/stores" variant="light">
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

export default StoreForm;
