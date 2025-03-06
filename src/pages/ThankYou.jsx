import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import attendImage from "../assets/Attend_rsvp.jpg"; // ✅ Ensure images are in `src/assets`
import notAttendingImage from "../assets/not_attending_rsvp.jpg";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const rsvpStatus = queryParams.get("rsvp");

  const imageSrc = rsvpStatus === "attending" ? attendImage : notAttendingImage;

  return (
    <Container>
      <h1>Thank You for Your Response!</h1>
      <ImageContainer>
        <Image src={imageSrc} alt="RSVP Response" />
      </ImageContainer>
      <ButtonContainer>
        <BackButton onClick={() => navigate("/")}>🏡 Back to Home</BackButton>
      </ButtonContainer>
    </Container>
  );
};

export default ThankYou;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Image = styled.img`
  max-width: 50%;
  height: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 70%;
  }

  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

/* ✅ Centered Button Elegantly Below the Image */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;
