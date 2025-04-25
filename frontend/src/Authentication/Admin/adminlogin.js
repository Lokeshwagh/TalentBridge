import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Hardcoded admin credentials
  const adminEmail = "tpo@gmail.com";
  const adminPassword = "pass1234";

  const handleAdminSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === adminEmail && password === adminPassword) {
      console.log("Authentication successful");
      setError("");
      navigate("/admin"); // Navigate to the admin dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Admin Login</h1>
      <form className="login-form" onSubmit={handleAdminSubmit}>
        <div className="login-form-group">
          <label htmlFor="admin-email" className="login-label">
            Email:
          </label>
          <input
            type="email"
            id="admin-email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="admin-password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="admin-password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
