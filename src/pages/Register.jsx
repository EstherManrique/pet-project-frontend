import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner/Spinner";
import { Alert, Button, Container } from "react-bootstrap";

function Register() {
  const [formErrors, setFormErrors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, userName, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if(message.hasOwnProperty('error')){
        setFormErrors(message.error);
      } else {
        setFormErrors([{
          msg: message.message
        }]);
      }
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        userName,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        minHeight: "40rem",
      }}
    >
      <Container>
        <section className="heading">
          <h2>
            <FaUser /> Registrate
          </h2>
          <p>Por avor crea una cuenta</p>
        </section>
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
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Ingresa tu nombre"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={userName}
                placeholder="Ingresa tu nombre de usuario"
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
                placeholder="Ingresa tu email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Ingresa tu password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirma tu password</label>
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirma tu password"
                onChange={onChange}
              />
            </div>
            <div className="form-group d-flex justify-content-between">
              <Button href="/" variant="light">
                Back
              </Button>
              <Button type="submit" variant="primary">
                Register
              </Button>
            </div>
          </form>
        </section>
      </Container>
    </div>
  );
}

export default Register;
