import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGuestByToken, submitRSVP } from "../api/rsvp";
import styled from "styled-components";
import weddingInvite from "../assets/Wedding_invite.jpg";

const RSVP = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [guest, setGuest] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const guestData = await getGuestByToken(token);
        setGuest(guestData);
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
      const response = await submitRSVP(token, rsvpStatus, guest.total_guests);

      if (response && response.message === "RSVP updated successfully") {
        alert("RSVP submitted successfully!");

        // ✅ Redirect to /thank-you with correct image based on RSVP status
        const imageType =
          rsvpStatus === "Attending" ? "attending" : "not_attending";
        navigate(`/thank-you?status=${imageType}`);
      } else {
        alert("Unexpected response. Please try again.");
      }
    } catch (err) {
      alert("Failed to submit RSVP. Please try again.");
      console.error("RSVP submission error:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container>
      {/* Wedding Invite Image */}
      <InviteImage src={weddingInvite} alt="Wedding Invitation" />

      {/* Guest Details */}
      <Heading>RSVP for {guest.name}</Heading>
      <Paragraph>Email: {guest.email}</Paragraph>
      <Paragraph>Family Side: {guest.family_side}</Paragraph>
      <Paragraph>Total Guests: {guest.total_guests}</Paragraph>

      {/* RSVP Buttons */}
      <ButtonGroup>
        <Button
          $isAttending={true}
          $active={rsvpStatus === "Attending"}
          onClick={() => setRsvpStatus("Attending")}
        >
          ATTENDING
        </Button>
        <Button
          $isAttending={false}
          $active={rsvpStatus === "Not Attending"}
          onClick={() => setRsvpStatus("Not Attending")}
        >
          NOT ATTENDING
        </Button>
      </ButtonGroup>

      <SubmitButton onClick={handleRSVP} $active={rsvpStatus !== ""}>
        Submit RSVP
      </SubmitButton>
    </Container>
  );
};

export default RSVP;

// Styled Components
const Heading = styled.h1`
  font-size: 52px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 48px; /* Adjust for tablets */
  }

  @media (max-width: 480px) {
    font-size: 32px; /* Adjust for mobile */
  }
`;

const Paragraph = styled.p`
  font-size: 32px;
  margin: 2px 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const InviteImage = styled.img`
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 5px;
    flex-wrap: nowrap;
    justify-content: center;
    width: 100%;
  }
`;

const Button = styled.button`
  width: 200px;
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  text-align: center;
  transition: 0.3s;

  /* ✅ Default State: Light Gray */
  background-color: ${(props) => (props.$active ? (props.$isAttending ? "#46d2c7" : "#464ff1") : "#ddd")};
  color: ${(props) => (props.$active ? "white" : "black")};

  &:hover {
    /* ✅ Darker Shade on Hover */
    background-color: ${(props) => (props.$isAttending ? "#3cb5af" : "#3a44d1")};
    color: white;
  }

  @media (max-width: 480px) {
    width: 48%;
    font-size: 16px;
    padding: 12px;
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  background-color: ${(props) => (props.$active ? "#d64df3" : "#ddd")}; /* ✅ Purple when active */
  color: ${(props) => (props.$active ? "white" : "black")};
  border: none;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: bold;
  cursor: ${(props) => (props.$active ? "pointer" : "not-allowed")};
  margin-top: 20px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => (props.$active ? "#b93ecb" : "#bbb")}; /* ✅ Darker Purple on Hover */
    color: white;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 12px 24px;
  }
`;

