import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    state: "",
    skills: "",
    dob: "",
    passing_year: "",
    qaulification: "",
    stream: "",
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value, // Remove square brackets
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/student_signup", values)
      .then((res) => {
        alert("User registered successfully!"); // Success alert
        navigate("/studentlogin");
      })
      .catch((err) => {
        alert("Error in registering user. Please try again."); // Error alert
      });
  };

  return (
    <div className="signup-container">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            name="skills"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="passing_year">Passing Year</label>
          <input
            type="text"
            id="passing_year"
            name="passing_year"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stream">Stream</label>
          <input
            type="text"
            id="stream"
            name="stream"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        If you have an account, please <a href="./studentlogin">Login</a>
      </p>
    </div>
  );
};

export default Signup;
