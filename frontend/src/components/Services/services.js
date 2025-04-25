import React from "react";
import { Link } from "react-router-dom";
import "./services.css";

const servicesData = [
  // AI Integrated Services
  {
    id: 5,
    title: "AI Resume Analyzer",
    description: "Get instant feedback on your resume with AI analysis.",
    icon: "🤖",
    buttonText: "Analyze Now",
    path: "https://smart-ats-ayush.streamlit.app/",
  },
  {
    id: 6,
    title: "AI Mock Interviews",
    description:
      "Practice interviews with AI-powered simulations and feedback.",
    icon: "🧠",
    buttonText: "Start AI Interview",
    path: "http://localhost:3001",
  },
  // Career Services
  {
    id: 1,
    title: "Resume Builder",
    description: "Create professional resumes with AI-powered templates.",
    icon: "📄",
    buttonText: "Build Now",
    path: "/resume",
  },
  {
    id: 3,
    title: "Job Postings",
    description: "Explore job opportunities from top companies.",
    icon: "💼",
    buttonText: "View Jobs",
    path: "/job",
  },
  {
    id: 4,
    title: "Aptitude & Coding Tests",
    description: "Take tests to prepare for company placements.",
    icon: "🖥️",
    buttonText: "Take Test",
    path: "/test",
  },
];

const Services = () => {
  return (
    <div className="services-container">
      <section className="section ai-integration-section">
        <div className="section-header">
          <h2 className="section-title">Enter the AI Career Revolution</h2>
          <p className="section-subtitle">
            Experience next-generation career development with our intelligent
            AI systems
          </p>
        </div>
        <div className="services-grid">
          {servicesData.slice(0, 2).map((service) => (
            <div className="service-card premium" key={service.id}>
              <div className="service-icon-container">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <Link to={service.path} className="service-button">
                {service.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section career-services-section">
        <div className="section-header">
          <h2 className="section-title">Comprehensive Career Solutions</h2>
          <p className="section-subtitle">
            Everything you need for successful career development in one
            platform
          </p>
        </div>
        <div className="services-grid">
          {servicesData.slice(2).map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-icon-container">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <Link to={service.path} className="service-button">
                {service.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
