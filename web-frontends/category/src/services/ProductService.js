import axios from "axios";

const API_URL = "http://localhost:4000/products";

export async function saveProduct(product) {
    try {
        return await axios.post(API_URL, product);
    } catch (error) {     
        console.error("Error saving product:", error);
    }
}

export async function getProducts(page = 1, size = 10) {
  try {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
  } catch (error) {
    console.error("Error saving product:", error);
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    return await axios.get(`${API_URL}/category/${categoryId}`);
  } catch (error) {
    console.error("Error saving product:", error);
  }
}

export async function getProduct(id) {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error saving product:", error);
  }
}

export async function updateProduct(product) {
  try {
    return await axios.put(API_URL, product);
  } catch (error) {
    console.error("Error saving product:", error);
  }
}

export async function updateImage(formData) {
  try {
    return await axios.put(`${API_URL}/image`, formData);
  } catch (error) {
    console.error("Error saving product:", error);
  }
}

export async function deleteProduct(id) {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error saving product:", error);
  }
}
