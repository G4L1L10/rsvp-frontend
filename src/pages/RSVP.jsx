import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGuestByToken, submitRSVP } from "../api/rsvp";
import styled from "styled-components";

const RSVP = () => {
  const { token } = useParams(); // ✅ Extract token correctly from URL path
  const navigate = useNavigate();
  const [guest, setGuest] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalGuests, setTotalGuests] = useState(1);

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const guestData = await getGuestByToken(token);
        setGuest(guestData);
        setTotalGuests(guestData.total_guests);
      } catch (err) {
        setError("Invalid RSVP token or guest not found.");
      }
      setLoading(false);
    };

    fetchGuest();
  }, [token]);

  const handleRSVP = async () => {
    if (!rsvpStatus) {
      alert("Please select your RSVP status.");
      return;
    }

    try {
      await submitRSVP(token, rsvpStatus, totalGuests);
      alert("RSVP submitted successfully!");
      navigate("/thank-you");
    } catch (err) {
      alert("Failed to submit RSVP. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container>
      <h1>RSVP for {guest.name}</h1>
      <p>Email: {guest.email}</p>
      <p>Family Side: {guest.family_side}</p>

      <Label>Total Guests:</Label>
      <GuestInput
        type="number"
        min="1"
        value={totalGuests}
        onChange={(e) => setTotalGuests(parseInt(e.target.value))}
      />

      <Label>Are you attending?</Label>
      <ButtonGroup>
        <Button
          active={rsvpStatus === "Attending"}
          onClick={() => setRsvpStatus("Attending")}
        >
          ✅ Attending
        </Button>
        <Button
          active={rsvpStatus === "Not Attending"}
          onClick={() => setRsvpStatus("Not Attending")}
        >
          ❌ Not Attending
        </Button>
      </ButtonGroup>

      <SubmitButton onClick={handleRSVP}>Submit RSVP</SubmitButton>
    </Container>
  );
};

export default RSVP;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Label = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const GuestInput = styled.input`
  width: 50px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => (props.active ? "#3498db" : "#ddd")};
  color: ${(props) => (props.active ? "white" : "black")};
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#2980b9" : "#bbb")};
  }
`;

const SubmitButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;

  &:hover {
    background-color: #27ae60;
  }
`;
