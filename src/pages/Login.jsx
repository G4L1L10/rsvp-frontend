import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // ✅ Redirect logged-in users away from the login page
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #219150;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
