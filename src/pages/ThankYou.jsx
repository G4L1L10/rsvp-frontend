import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import attendingImage from "../assets/Attend_rsvp.jpg";
import notAttendingImage from "../assets/not_attending_rsvp.jpg";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get status from URL
  const params = new URLSearchParams(location.search);
  const status = params.get("status");

  // ✅ Choose the correct image
  const imageSrc = status === "attending" ? attendingImage : notAttendingImage;

  return (
    <Container>
      <Image src={imageSrc} alt="Thank You" />
      <BackButton onClick={() => navigate("/")}>Back to Home</BackButton>
    </Container>
  );
};

export default ThankYou;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Image = styled.img`
  max-width: 50%; /* ✅ Makes it mobile-friendly */
  height: auto;
`;

const BackButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;
