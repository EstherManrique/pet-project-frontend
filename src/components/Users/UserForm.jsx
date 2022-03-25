import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

const UserForm = ({ ...props }) => {
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();

  const { id } = props;

  const { user } = useSelector((state) => state.auth);

  const formDefault = {
    name: "",
    userName: "",
    email: "",
    password: "",
    roleId: "",
    storeId: "",
  };

  const [formData, setFormData] = useState(formDefault);

  const [rolesList, setRolesList] = useState([]);

  const [storesList, setStoresList] = useState([]);

  const { name, userName, email, password, roleId, storeId } = formData;

  const saveUser = async (data) => {
    const url = id
      ? `http://localhost:5000/api/users/${id}`
      : "http://localhost:5000/api/users";
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
          toast.success("🦄 User saved.", {
            autoClose: 1000,
            onClose: () => navigate("/admin/users"),
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

  const getUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          toast.error("HTTP status " + response.status);
        }
      })
      .then((json) => {
        const { name, userName, email, roleId, storeId } = json.user;
        setFormData({
          name,
          userName,
          email,
          roleId: roleId._id,
          storeId: storeId ? storeId._id : "",
        });
      });
  };

  const getRoles = async () => {
    await fetch("http://localhost:5000/api/roles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          toast.error("HTTP status " + response.status);
        }
      })
      .then((json) => {
        setRolesList(json.roles);
      });
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      userName,
      email,
      password,
      roleId
    };
    if(storeId !== "") {
      userData.storeId = storeId;
    }
    saveUser(userData);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getRoles();
    getStores();
    if (id) {
      getUser(id);
    }
  }, []);

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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={onChange}
            />
          </div>
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
              placeholder="Enter email"
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
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleId">Role</label>
            <select
              onChange={onChange}
              name="roleId"
              id="roleId"
              className="form-select"
              aria-label="Default select example"
              value={roleId}
            >
              <option value="">Select role</option>
              {rolesList.map((role) => {
                return (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="storeId">Store</label>
            <select
              onChange={onChange}
              name="storeId"
              id="storeId"
              className="form-select"
              aria-label="Default select example"
              value={storeId}
            >
              <option value="">Select store</option>
              {storesList.map((store) => {
                return (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group d-flex justify-content-between">
            <Button href="/admin/users" variant="light">
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

export default UserForm;
