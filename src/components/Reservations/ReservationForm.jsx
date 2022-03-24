import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, -8);
};

const ReservationForm = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { user } = useSelector((state) => state.auth);

  const formDefault = {
    petName: "",
    date: "",
    clientPhone: "",
    storeId: searchParams.get("storeId") || "",
    serviceId: searchParams.get("serviceId") || "",
  };

  const [formData, setFormData] = useState(formDefault);

  const [storesList, setStoresList] = useState([]);

  const [servicesList, setServicesList] = useState([]);

  const { petName, date, clientPhone, storeId, serviceId } = formData;

  const getStores = async () => {
    await fetch("http://localhost:5000/api/stores")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          toast.error("HTTP status " + response.status);
        }
      })
      .then((json) => {
        setStoresList(json.stores);
      });
  };

  const getServices = async () => {
    await fetch("http://localhost:5000/api/services")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          toast.error("HTTP status " + response.status);
        }
      })
      .then((json) => {
        setServicesList(json.services);
      });
  };

  const saveReservation = async (data) => {
    await fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Reservation saved to be reviewed by a manager.", {
          autoClose: 1000,
          onClose: () => navigate("/"),
        });
      } else {
        toast.error("HTTP status " + response.status);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const dateObj = new Date(date);
    const reservationData = {
      petName,
      date: dateObj.toISOString(),
      clientPhone,
      clientId: user._id,
      storeId,
      serviceId,
    };
    saveReservation(reservationData);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getStores();
    getServices();
  }, []);

  return (
    <Fragment>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Pet Name</label>
            <input
              type="text"
              className="form-control"
              id="petName"
              name="petName"
              value={petName}
              placeholder="Enter pet name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Date</label>
            <input
              type="datetime-local"
              className="form-control"
              id="date"
              name="date"
              min={getTomorrowDate()}
              value={date}
              placeholder="Enter date"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Client phone</label>
            <input
              type="tel"
              className="form-control"
              id="clientPhone"
              name="clientPhone"
              value={clientPhone}
              placeholder="Enter your phone"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Stores</label>
            <select
              onChange={onChange}
              name="storeId"
              className="form-select"
              aria-label="Default select example"
              value={storeId}
            >
              <option value="">Select a store</option>
              {storesList.map((store) => {
                return (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Services</label>
            <select
              onChange={onChange}
              name="serviceId"
              className="form-select"
              aria-label="Default select example"
              value={serviceId}
            >
              <option value="">Select a service</option>
              {servicesList.map((service) => {
                return (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group d-flex justify-content-between">
            <Button href="/" variant="light">
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

export default ReservationForm;
