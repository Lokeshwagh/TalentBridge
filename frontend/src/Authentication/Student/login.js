import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  axios.defaults.withCredentials = true;

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/student_login", { email, password })
      .then((res) => {
        console.log("Backend Response:", res.data); // Debugging line
        if (res.data.Status === "Success") {
          // Store student_id in localStorage
          localStorage.setItem("student_id", res.data.student_id);
          alert("Login Successful!");
          navigator("/");
          window.location.reload();
        } else {
          alert("Login Failed! Invalid credentials.");
        }
      })
      .catch((err) => {
        console.log("Error Details:", err.response?.data || err.message); // Enhanced error logging
        alert("Login Failed! Server error.");
      });
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="email" className="login-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        If you are new here , please <a href="./signup">register</a>
      </p>
    </div>
  );
};

export default Login;
