import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import invitationBackground from "../assets/invitation_background.jpg"; // Ensure correct path

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
      <Content>
        <h1>Please enter your RSVP token to view your invitation.</h1>
        <Form onSubmit={handleRSVPSubmit}>
          <Input
            type="text"
            placeholder="Enter RSVP token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <SubmitButton type="submit">View Invitation</SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${invitationBackground});
  background-size: cover;
  background-position: center;
  text-align: center;
`;

const Content = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 90%;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 12px;
  width: 250px;
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 5px;
  outline: none;
  text-align: center;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;
