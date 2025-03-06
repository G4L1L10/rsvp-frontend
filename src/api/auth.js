import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    console.log("Login API Response:", response.data);

    localStorage.setItem("token", response.data.access_token); // Store token

    return response.data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response ? error.response.data : error,
    );
    throw error.response ? error.response.data : new Error("Login failed");
  }
};

// ✅ Refresh Token Function
export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/refresh`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    localStorage.setItem("token", response.data.access_token);
    console.log("🔄 Token refreshed successfully!");
  } catch (error) {
    console.error("❌ Failed to refresh token:", error);
    localStorage.removeItem("token"); // Remove invalid token
    throw new Error("Session expired. Please log in again.");
  }
};
