import axios from "axios";

const API_URL = "https://authentication-331451434225.us-central1.run.app";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    }); // ✅ Correct endpoint

    console.log("✅ Login API Response:", response.data);

    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      console.log("🔒 Token stored:", response.data.access_token);
    } else {
      throw new Error("No token received.");
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ Login error:",
      error.response ? error.response.data : error,
    );
    throw error.response ? error.response.data : new Error("Login failed");
  }
};

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("🔄 Attempting refresh with token:", token);

    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      console.log("✅ Token refreshed:", response.data.access_token);
    } else {
      throw new Error("No token received from refresh.");
    }
  } catch (error) {
    console.error("❌ Refresh failed:", error);
    localStorage.removeItem("token"); // Clear expired token
    throw new Error("Session expired. Please log in again.");
  }
};
