// Hero.js - Updated with improved animations
import React from "react";
import "./Hero.css";
import { useNavigate, Link } from "react-router-dom";
import img2 from "../../assets/images/imagesinPlacement/hero-carousel-3.svg";
import { HiArrowSmRight } from "react-icons/hi";

export default function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/job");
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="text-content">
          <div className="herotextContent">
            <div className="header-wrapper">
              <h1 className="main-heading">
                <span className="gradient-text">Talent</span>
                <span className="logo-bridge">Bridge</span>
                <span className="bridge-line"></span>
              </h1>
            </div>

            <div class="hero-container">
              <p class="hero-description">Connecting dreams to destinations</p>
            </div>
          </div>
          {/*  */}
          <div className="button-group">
            <button className="exlore-button" onClick={handleClick}>
              <span className="button-text">Explore Jobs</span>
              <HiArrowSmRight className="button-icon" />
            </button>

            <Link to="/about" className="about-button secondary">
              <span className="button-text">About Us</span>
              <HiArrowSmRight className="button-icon" />
            </Link>
          </div>
        </div>

        <div className="visual-content">
          <div className="image-container">
            <img
              src={img2}
              alt="Career Opportunities"
              className="floating-image"
            />
            <div className="gradient-overlay"></div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="animated-bg">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="floating-circle"></div>
        ))}
      </div>
    </div>
  );
}
