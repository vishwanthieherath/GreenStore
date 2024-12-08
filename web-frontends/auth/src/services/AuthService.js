import axios from "axios";

const API_URL = "http://localhost:4000/auth";

export async function logIn(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export async function signUp(email, password) {
  try {
    return await axios
      .post(`${API_URL}/signup`, { email, password })
      .then((response) => {
        console.log("Success:", response.data);
      });
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

// export async function logOut() {
//   try {
//     return await axios.get(`${API_URL}/logout`).then((response) => {
//       console.log("Success:", response.data);
//     });
//   } catch (error) {
//     console.error("Error logging out:", error);
//   }
// }

