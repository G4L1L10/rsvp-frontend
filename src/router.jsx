import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InviteGuest from "./pages/InviteGuest";
import RSVP from "./pages/RSVP"; // ✅ Import RSVP Page
import ProtectedRoute from "./components/ProtectedRoute";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rsvp/:token" element={<RSVP />} />{" "}
      {/* ✅ Added RSVP Route */}
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
