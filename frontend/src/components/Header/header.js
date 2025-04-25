// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./header.css";

import User from "../../assets/images/LoginModal/user.png";
import Admin from "../../assets/images/LoginModal/admin.png";
import HeaderLogo from "../../assets/images/Header_Logo/TB.png";
import ProfileImg from "../../assets/images/Header_Logo/profile_image.jpg";

const HEADER_NAV_LINKS = [
  { text: "Home", url: "/" },
  { text: "About", url: "/about" },
  { text: "Services", url: "/services" },
  { text: "Contact", url: "/contact" },
  { text: "Notice", url: "/student-notice" },
];

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/student_profile",
          { withCredentials: true }
        );
        if (response.status === 200) setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleAuthAction = (path, role) => {
    setShowModal(false);
    navigate(`/${role}${path}`);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-container">
          <img
            src={HeaderLogo}
            alt="Talent Bridge Logo"
            className="main-logo"
          />
          <div className="logo-text">
            <h1>Talent Bridge</h1>
            <p>Connecting dreams to destinations</p>
          </div>
        </div>

        <nav className="nav-container">
          {HEADER_NAV_LINKS.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className={`nav-link ${link.className || ""}`}
            >
              {link.text}
            </Link>
          ))}

          {isLoggedIn ? (
            <img
              src={ProfileImg}
              alt="Profile"
              className="header-profile-image"
              onClick={() => navigate("/studentprofile")}
            />
          ) : (
            <button className="login-button" onClick={() => setShowModal(true)}>
              Login
            </button>
          )}
        </nav>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <button className="close-modal" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <div className="auth-options">
              <div className="auth-option student-option">
                <img src={User} alt="Student" />
                <h3>Student Access</h3>
                <div className="auth-buttons">
                  <button onClick={() => handleAuthAction("login", "student")}>
                    Login
                  </button>
                  <button onClick={() => handleAuthAction("signup", "student")}>
                    Sign Up
                  </button>
                </div>
              </div>

              <div className="auth-option admin-option">
                <img src={Admin} alt="Admin" />
                <h3>TPO Access</h3>
                <div className="auth-buttons">
                  <button onClick={() => handleAuthAction("login", "admin")}>
                    Login
                  </button>
                  <button onClick={() => handleAuthAction("signup", "admin")}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
