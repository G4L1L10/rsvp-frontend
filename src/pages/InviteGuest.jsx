import { useState } from "react";
import { sendInvite } from "../api/rsvp";
import styled from "styled-components";

const InviteGuest = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [familySide, setFamilySide] = useState(""); // "Axel" or "Daphne"
  const [totalGuests, setTotalGuests] = useState(1); // Default to 1
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!familySide) {
      setMessage("Please select a family side.");
      setLoading(false);
      return;
    }

    try {
      await sendInvite({
        name,
        email,
        family_side: familySide,
        total_guests: totalGuests,
      });
      setMessage("Invitation sent successfully!");
      setName("");
      setEmail("");
      setFamilySide("");
      setTotalGuests(1);
    } catch (error) {
      setMessage("Failed to send invitation.");
    }

    setLoading(false);
  };

  return (
    <Container>
      <h1>Invite a Guest</h1>
      <Form onSubmit={handleInvite}>
        {/* Full Name Input */}
        <Label>Guest Name:</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter full name"
        />

        {/* Email Input */}
        <Label>Guest Email:</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter guest's email"
        />

        {/* Family Side (Radio Buttons) */}
        <Label>Family Side:</Label>
        <RadioContainer>
          <RadioLabel>
            <input
              type="radio"
              value="Axel"
              checked={familySide === "Axel"}
              onChange={() => setFamilySide("Axel")}
            />
            Axel's Side
          </RadioLabel>

          <RadioLabel>
            <input
              type="radio"
              value="Daphne"
              checked={familySide === "Daphne"}
              onChange={() => setFamilySide("Daphne")}
            />
            Daphne's Side
          </RadioLabel>
        </RadioContainer>

        {/* Total Guests (Dropdown) */}
        <Label>Total Number of Guests:</Label>
        <Select
          value={totalGuests}
          onChange={(e) => setTotalGuests(parseInt(e.target.value, 10))}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </Select>

        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Invite"}
        </Button>
      </Form>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default InviteGuest;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
`;

const Label = styled.label`
  font-size: 16px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const RadioLabel = styled.label`
  margin: 0 10px;
  font-size: 16px;

  input {
    margin-right: 5px;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #2c3e50;
`;
