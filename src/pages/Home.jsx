import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import styled from "styled-components";
import invitationBackground from "../assets/invitation_background.jpg";

// 🎉 Set the target time (July 27th, 6:30 PM)
const eventDate = new Date("2025-07-27T18:30:00");

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

          {/* 🎉 Crypto-Themed Subtitle */}
          <Subtitle>🚀 Genesis Block Minting in Progress...</Subtitle>

          {/* ⏳ Countdown Timer */}
          <CountdownText>Confirmation in:</CountdownText>
          <CountdownNumber>
            <Countdown date={eventDate} />
          </CountdownNumber>

          <PromptText>
            Enter your invitation token below to verify eligibility:
          </PromptText>

          <Form onSubmit={handleRSVPSubmit}>
            <Input
              type="text"
              placeholder="Enter RSVP Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <SubmitButton type="submit">Verify Invitation</SubmitButton>
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

  @media (max-width: 480px) {
    width: 100%;
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
    font-size: 38px;
    margin-top: 52px;
  }

  /* ✅ Make the 'n' smaller */
  span {
    font-size: 32px;
    vertical-align: middle;
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
  margin-bottom: 40px;
  color: #464ff1; /* Periwinkle */

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const CountdownText = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #46d2c7; /* Cyan */
  margin-bottom: 1px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CountdownNumber = styled.p`
  font-size: 48px;
  font-weight: bold;
  color: #46d2c7; /* Cyan */
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 4px;
  }
`;

const PromptText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-top: 30px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 5px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  width: 420px;
  font-size: 18px;
  border: 2px solid gray;
  border-radius: 8px;
  outline: none;
  margin-top: 14px;
  text-align: center;
  background-color: lightgray;

  @media (max-width: 480px) {
    width: 240px;
    font-size: 14px;
    padding: 8px;
  }
`;

const SubmitButton = styled.button`
  background-color: #d64df3; /* Purple */
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 8px;
  width: 300px;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #b63adb;
  }

  @media (max-width: 480px) {
    width: 240px;
    font-size: 14px;
    padding: 10px;
  }
`;
