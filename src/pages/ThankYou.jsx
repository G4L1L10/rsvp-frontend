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
  text-align: center;
  height: 100vh;
  padding: 20px;
`;

const Image = styled.img`
  max-width: 40%;
  height: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 60%; /* ✅ Adjusts for tablets */
  }

  @media (max-width: 480px) {
    max-width: 100%; /* ✅ Optimized for smaller screens */
  }
`;

const BackButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 12px 24px;
    width: 50%;
  }
`;

