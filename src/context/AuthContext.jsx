import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth"; // ✅ Fix: Ensure this is imported

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Restore login state from localStorage on refresh
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        setUser({ ...storedUser, token: storedToken });
      }
    } catch (error) {
      console.error("Error restoring login state:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);

  // ✅ Fix: Make sure this function uses `loginUser` correctly
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);

      console.log("User logged in:", data);

      if (data && data.access_token) {
        const user = { token: data.access_token, email };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.access_token);

        console.log("Redirecting to dashboard...");
        navigate("/dashboard");
      } else {
        console.error("Login failed: Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
