// Footer.jsx
import React from "react";
import "./footer.css";
import instagram from "../../assets/images/Social_Media/instagram.png";
import facebook from "../../assets/images/Social_Media/facebook.png";
import gmail from "../../assets/images/Social_Media/gmail.png";
import twitter from "../../assets/images/Social_Media/twitter.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Talent Bridge</h3>
          <p className="footer-quote">
            "Bridging talent with opportunity,
            <br /> because potential deserves the right stage
            <br /> to shine and succeed."
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Info</h3>
          <ul className="footer-list">
            <li>TalentBridge@gmail.com</li>
            <li>(+91) 70245 88587</li>
            <li>XYZ Street, City - 5447XX</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Connect With Us</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" className="social-link">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="#" className="social-link">
              <img src={gmail} alt="Email" />
            </a>
            <a href="#" className="social-link">
              <img src={twitter} alt="Twitter" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Talent Bridge. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
