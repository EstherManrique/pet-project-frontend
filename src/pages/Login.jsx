import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner/Spinner";
import { Alert, Button, Container } from "react-bootstrap";

function Login() {
  const [formErrors, setFormErrors] = useState([]);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { userName, email, password } = formData;

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

    const userData = {
      userName,
      email,
      password,
    };

    dispatch(login(userData));
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
            <FaSignInAlt /> Login
          </h2>
          <p>Enter and make a reservation</p>
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
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={userName}
                placeholder="Enter username"
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>
            <div className="form-group d-flex justify-content-between">
              <Button href="/" variant="light">
                Back
              </Button>
              <Button type="submit" variant="primary">
                Login
              </Button>
            </div>
          </form>
        </section>
      </Container>
    </div>
  );
}

export default Login;
