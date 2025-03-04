import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Welcome to Our App</h1>
      <p>
        {user
          ? `You're logged in as ${user.email}`
          : "Please log in to access your dashboard."}
      </p>

      {!user && <Button onClick={() => navigate("/login")}>Login</Button>}
      {user && (
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      )}
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;
