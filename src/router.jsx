import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InviteGuest from "./pages/InviteGuest";
import RSVP from "./pages/RSVP";
import ProtectedRoute from "./components/ProtectedRoute";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jarvisismycopilot" element={<Login />} />{" "}
      {/* ✅ Only accessible via URL */}
      <Route path="/rsvp/:token" element={<RSVP />} />
      <Route
        path="/invite-guest"
        element={
          <ProtectedRoute>
            <InviteGuest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
