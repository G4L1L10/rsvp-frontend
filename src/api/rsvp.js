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

export const sendInvite = async ({
  name,
  email,
  family_side,
  total_guests,
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found. Please login.");
  }

  try {
    const response = await axios.post(
      "http://localhost:8081/admin/invite",
      { name, email, family_side, total_guests },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error sending invite:", error);
    throw error;
  }
};

// Fetch guest by RSVP token
export const getGuestByToken = async (token) => {
  const response = await axios.get(`${RSVP_API_URL}/rsvp/${token}`);
  return response.data;
};

// Submit RSVP response
export const submitRSVP = async (token, status, totalGuests) => {
  const response = await axios.post(`${RSVP_API_URL}/rsvp/`, {
    rsvp_token: token,
    rsvp_status: status,
    total_guests: totalGuests,
  });
  return response.data;
};
