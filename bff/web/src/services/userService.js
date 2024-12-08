const axios = require("axios");
const apiUrl = "http://localhost:8080/users";

// Get user by ID
exports.getUserById = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

// Create a new user
exports.createUser = async (userData) => {
  const response = await axios.post(apiUrl, userData);
  return response.data;
};
