import React from "react";
import "./References.css";
import ResumeAnalyser from "../../../assets/images/References-Img/resumeAnalyser.jpg";
import MockInterview from "../../../assets/images/References-Img/mockInterview.jpg";
import ResumeBuilder from "../../../assets/images/References-Img/resumeBuilder.jpg";

const References = () => {
  return (
    <div className="references-container">
      {/* Hero Section */}
      <section
        className="references-hero"
        style={{ backgroundColor: "#f8f9fc" }}
      >
        <div className="hero-content">
          <h1
            className="hero-title"
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #b04fc4, #5a2aaf)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Connecting Dreams to Destinations
          </h1>
          <p
            className="hero-subtitle"
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              color: "#4c4c4c",
            }}
          >
            Discover job opportunities, enhance your skills, and bridge the gap
            between talent and success.
          </p>
        </div>
      </section>

      {/* Services Overview Section */}
      <div className="services-overview">
        <div className="service-card">
          <img
            src={ResumeAnalyser}
            alt="AI Resume Analyzer"
            className="service-image"
          />
          <h3>AI Resume Analyzer</h3>
          <p>
            Optimize your resume with AI-powered insights to stand out in job
            applications.
          </p>
          <button
            className="service-button"
            onClick={() =>
              (window.location.href = "https://smart-ats-ayush.streamlit.app/")
            }
          >
            Explore
          </button>
        </div>

        <div className="service-card">
          <img
            src={MockInterview}
            alt="Mock Interviews"
            className="service-image"
          />
          <h3>Mock Interviews</h3>
          <p>
            Practice with AI-driven mock interviews to boost confidence and ace
            real interviews.
          </p>
          <button
            className="service-button"
            onClick={() => (window.location.href = "http://localhost:3001")}
          >
            Explore
          </button>
        </div>

        <div className="service-card">
          <img
            src={ResumeBuilder}
            alt="Resume Builder"
            className="service-image"
          />
          <h3>Resume Builder</h3>
          <p>
            Build your resume with us and take the first step toward your dream
            job!
          </p>
          <button
            className="service-button"
            onClick={() => (window.location.href = "/resume")}
          >
            Explore
          </button>
        </div>
      </div>

      {/* Visit Services Button */}
      <div className="visit-services-container">
        <button
          className="visit-services-button"
          onClick={() => (window.location.href = "/services")}
        >
          Visit Services
        </button>
      </div>
    </div>
  );
};

export default References;
