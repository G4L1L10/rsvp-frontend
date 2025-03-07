import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getGuests } from "../api/rsvp";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const guestData = await getGuests();
        setGuests(guestData || []);
      } catch (err) {
        setError(err.message);

        if (err.message.includes("Session expired")) {
          logout(); // Log user out if refresh fails
          navigate("/login");
        }
      }
      setLoading(false);
    };

    fetchGuests();
  }, [logout, navigate]);

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.email}!</p>
        <Button onClick={logout}>Logout</Button>
      </Header>

      <ButtonContainer>
        <InviteButton to="/invite-guest">Invite a Guest</InviteButton>
      </ButtonContainer>

      <h2>Guest List</h2>

      {loading && <p>Loading guests...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {guests.length === 0 && !loading && (
        <p>No guests found. Invite a guest to get started!</p>
      )}

      {guests.length > 0 && (
        <TableWrapper>
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
                  <td>
                    {guest.rsvp_status === "" || guest.rsvp_status === null
                      ? "Pending"
                      : guest.rsvp_status}
                  </td>
                  <td>{guest.rsvp_token}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};

export default Dashboard;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin: 20px 0;
`;

const InviteButton = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #2980b9;
  }
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

const TableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
    font-size: 16px;
  }

  th {
    background-color: #f4f4f4;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 14px;
      padding: 8px;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 12px;
      padding: 6px;
    }
  }
`;
