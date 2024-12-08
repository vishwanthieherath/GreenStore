const axios = require("axios");
const apiUrl = "http://localhost:8080/products";

// Get product by ID
exports.getProduct = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

exports.getProducts = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

exports.getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${apiUrl}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products by category:", error);
  }
};


// Create a new product
exports.createProduct = async (productData) => {
  const response = await axios.post(apiUrl, productData);
  return response.data;
};
