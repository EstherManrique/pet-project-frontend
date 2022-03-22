import axios from "axios";

const API_URL = "/api/users/";

// Create new user

const createUser = async (userDate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token},`,
    },
  };

  const response = await axios.post(API_URL, userDate, config);

  return response.data;
};

// Get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + userId, config);

  return response.data;
};

const userService = {
  createUser,
  getUsers,
  deleteUser,
};

export default userService;
