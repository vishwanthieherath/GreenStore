const axios = require("axios");
const apiUrl = "http://localhost:8082/carts";

// Get cart by ID
exports.getCart = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};


exports.getCarts = async (req) => {

  const userId = req.user?.username;

  try {
    const response = await axios.get(`${apiUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching carts: No carts found!", error);
  }
};


// Create a new cart
exports.createCart = async (req) => {

  const userId = req.user?.username;
  const name = req.body.cartName;

  console.log(userId);
  console.log(name);

  const response = await axios.post(apiUrl, { name, userId });
  console.log(response.data);
  return response.data;
};
