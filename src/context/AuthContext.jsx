import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Clear invalid data
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);

      console.log("User logged in:", data); // Debugging

      if (data && data.access_token) {
        // Store token and create a dummy user object (since backend doesn't return user info)
        const user = { token: data.access_token, email };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.access_token);

        console.log("Redirecting to dashboard..."); // Debugging
        navigate("/dashboard"); // Redirect after successful login
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
      {children}
    </AuthContext.Provider>
  );
};
