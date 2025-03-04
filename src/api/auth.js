import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // Ensure this matches your backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    console.log("Login API Response:", response.data); // Debugging

    return response.data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response ? error.response.data : error,
    );
    throw error.response ? error.response.data : new Error("Login failed");
  }
};
