import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <h1>Welcome to the Wedding RSVP System</h1>
      <p>Confirm your attendance and join the celebration.</p>
      {/* No Login Button */}
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 50px;
`;
