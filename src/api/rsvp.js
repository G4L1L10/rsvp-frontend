import axios from "axios";

const RSVP_API_URL = "http://localhost:8081"; // Ensure no trailing slash

export const getGuests = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found. Please login.");
  }

  try {
    const response = await axios.get(`${RSVP_API_URL}/admin/guests`, {
      // No trailing slash
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching guests:", error);
    throw error;
  }
};
