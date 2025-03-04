import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;
