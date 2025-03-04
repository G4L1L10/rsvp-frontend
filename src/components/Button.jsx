import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ color }) => color || "#3498db"};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#2980b9"};
  }
`;

export default Button;
