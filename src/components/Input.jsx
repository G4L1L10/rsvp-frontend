import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

export default Input;
