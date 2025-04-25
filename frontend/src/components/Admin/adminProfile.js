import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminProfile.css";
import profileImage from "../../assets/images/LoginModal/admin.png"; // Import the profile image

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState({
    tpo_id: "",
    full_name: "",
    email: "",
    phone_number: "",
    designation: "",
    institution_name: "",
    institution_address: "",
    institution_contact: "",
    institution_email: "",
    username: "",
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin-profile");
        setAdminDetails(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="admin-profile-container">
      <h1>Welcome TPO </h1>
      <button className="go-back-btn" onClick={handleGoBack}>
        &times;
      </button>
      <div className="profile-details">
        <div className="profile-image">
          <img src={profileImage} alt="Admin Profile" />
        </div>
        <div className="profile-item">
          <label>Full Name:</label>
          <span>{adminDetails.full_name}</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>{adminDetails.email}</span>
        </div>
        <div className="profile-item">
          <label>Phone Number:</label>
          <span>{adminDetails.phone_number}</span>
        </div>
        <div className="profile-item">
          <label>Designation:</label>
          <span>{adminDetails.designation}</span>
        </div>
        <div className="profile-item">
          <label>Institution Name:</label>
          <span>{adminDetails.institution_name}</span>
        </div>
        <div className="profile-item">
          <label>Institution Address:</label>
          <span>{adminDetails.institution_address}</span>
        </div>
        <div className="profile-item">
          <label>Institution Contact:</label>
          <span>{adminDetails.institution_contact}</span>
        </div>
        <div className="profile-item">
          <label>Institution Email:</label>
          <span>{adminDetails.institution_email}</span>
        </div>
        <div className="profile-item">
          <label>Username:</label>
          <span>{adminDetails.username}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
