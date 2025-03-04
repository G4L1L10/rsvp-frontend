import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getGuests } from "../api/rsvp"; // Import API helper
import styled from "styled-components";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const guestData = await getGuests();
        setGuests(guestData);
      } catch (err) {
        setError("Failed to fetch guests.");
      }
      setLoading(false);
    };

    fetchGuests();
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}!</p>

      <Button onClick={logout}>Logout</Button>

      <h2>Guest List</h2>

      {loading && <p>Loading guests...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Family Side</th>
            <th>Hongbao</th>
            <th>Total Guests</th>
            <th>RSVP Status</th>
            <th>RSVP Token</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.id}</td>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.family_side}</td>
              <td>${guest.hongbao}</td>
              <td>{guest.total_guests}</td>
              <td>{guest.rsvp_status ? "Attending" : "Not Attending"}</td>
              <td>{guest.rsvp_token}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #c0392b;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
`;
