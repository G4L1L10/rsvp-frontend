import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import invitationBackground from "../assets/invitation_background.jpg"; // ✅ Correct image path

const Home = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    if (token.trim()) {
      navigate(`/rsvp/${token}`);
    } else {
      alert("Please enter a valid RSVP token.");
    }
  };

  return (
    <Container>
      <BoxContainer>
        {/* ✅ Background Image & Content inside this container */}
        <Content>
          <Title>
            Axel <span>'n'</span> Daphne
          </Title>
          <Subtitle>Welcome to the wedding website</Subtitle>

          <PromptText>
            Please enter your RSVP token to view your invitation.
          </PromptText>

          <Form onSubmit={handleRSVPSubmit}>
            <Input
              type="text"
              placeholder="Enter RSVP Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <SubmitButton type="submit">View Invitation</SubmitButton>
          </Form>
        </Content>
      </BoxContainer>
    </Container>
  );
};

export default Home;

// 🔹 Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa; /* ✅ Light background for contrast */
  text-align: center;
  padding: 20px;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${invitationBackground});
  background-size: contain; /* ✅ Ensures image fits properly */
  background-repeat: no-repeat;
  background-position: center;
  width: 720px; /* ✅ Defined size for a structured layout */
  height: 720px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    background-size: cover;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 62px;
  font-family: "Winkle", sans-serif;
  font-weight: bold;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }

  /* Style for the small 'n' */
  span {
    font-size: 32px; /* ✅ Make 'n' smaller */
    vertical-align: middle; /* ✅ Align properly */
    font-weight: normal;

    @media (max-width: 768px) {
      font-size: 24px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

const Subtitle = styled.h2`
  font-size: 38px;
  font-family: "Winkle", sans-serif;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const PromptText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Input = styled.input`
  padding: 12px;
  width: 420px;
  font-size: 18px;
  border: 2px solid gray;
  border-radius: 8px;
  outline: none;
  margin-top: 40px;
  text-align: center;
  background-color: lightgray;

  @media (max-width: 480px) {
    width: 260px;
    font-size: 14px;
    padding: 10px;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  width: 300px;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 480px) {
    width: 260px;
    font-size: 14px;
    padding: 10px;
  }
`;
