import axios from "axios";
import { refreshToken } from "./auth"; // Import refresh function

const RSVP_API_URL = "https://rsvp-backend-331451434225.us-central1.run.app"; // ✅ Updated to Cloud Run

// ✅ Fetch all guests
export const getGuests = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("🔑 Token being sent:", token); // Debugging

    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.get(`${RSVP_API_URL}/admin/guests`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Guests fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching guests:", error.response || error);
    throw error;
  }
};

// ✅ Send an invite to a guest
export const sendInvite = async ({
  name,
  email,
  family_side,
  total_guests,
}) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }

    const response = await axios.post(
      `${RSVP_API_URL}/admin/invite`,
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
    console.error("❌ Error sending invite:", error.response || error);
    throw error;
  }
};

// ✅ Fetch guest details using their RSVP token
export const getGuestByToken = async (token) => {
  try {
    const response = await axios.get(`${RSVP_API_URL}/rsvp/${token}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching guest by token:", error.response || error);
    throw error;
  }
};

// ✅ Submit RSVP response
export const submitRSVP = async (token, status, totalGuests) => {
  try {
    const response = await axios.post(`${RSVP_API_URL}/rsvp/`, {
      rsvp_token: token,
      rsvp_status: status,
      total_guests: totalGuests,
    });

    console.log("✅ RSVP API Response:", response.data); // Debugging log

    return response.data;
  } catch (error) {
    console.error("❌ RSVP submission failed:", error.response || error);
    throw error;
  }
};
