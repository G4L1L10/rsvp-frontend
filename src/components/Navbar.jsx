import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo onClick={() => navigate("/")}>AuthFrontend</Logo>
      <NavLinks>
        {user ? (
          <>
            <span>{user.email}</span>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #2c3e50;
  color: white;
`;

const Logo = styled.h1`
  font-size: 20px;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;
