const axios = require("axios");
const apiUrl = "http://localhost:8080/categories";

// Get category by ID
exports.getCategory = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

exports.getCategories = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Create a new category
exports.createCategory = async (categoryData) => {
  const response = await axios.post(apiUrl, categoryData);
  return response.data;
};
