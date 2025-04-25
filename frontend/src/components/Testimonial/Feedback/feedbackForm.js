import React, { useState } from "react";
import axios from "axios";
import "./feedbackForm.css";
import Feedback from "../../../assets/images/Feedback/feedback.jpg";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    testimonial: "",
    rating: "",
    placed_company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/feedback",
        formData
      );
      alert(response.data.message);
      setFormData({
        name: "",
        email: "",
        testimonial: "",
        rating: "",
        placed_company: "",
      });
    } catch (error) {
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Add Testimonial</h2>
      <div className="feedback">
        <div className="f-image">
          <img src={Feedback} className="f-backimg" alt="Feedback" />
        </div>
        <div className="f-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="testimonial"
              placeholder=" Feedback"
              value={formData.testimonial}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="placed_company"
              placeholder="Company Name (if applicable)"
              value={formData.placed_company}
              onChange={handleChange}
            />
            <button type="submit" className="s-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
