import React, { useState } from "react";
import axios from "axios";
import "./contact.css";
import { useNavigate } from "react-router-dom";
import contactimag from "../../assets/images/imagesinPlacement/contactusSVG.webp"
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    // Get student ID from localStorage with correct key
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      setResponseMessage("You must be logged in to contact us.");
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        student_id: studentId, // Correct property name
      };

      const response = await axios.post(
        "http://localhost:5000/contact",
        dataToSend
      );

      setResponseMessage(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      navigate("/");
    } catch (error) {
      console.error("Submission error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      setResponseMessage(
        error.response?.data?.message ||
          "Failed to submit the form. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fcf-body">
     <h3 className="fcf-h3">Contact Us</h3> <div id="fcf-form">
        
        <div className="contactimg">
          <img src={contactimag} style={{height:"50%"}}/>
        </div>
        <div className="contactform"> 
          {responseMessage && (
          <div
            className={`fcf-response ${
              responseMessage.includes("success") ? "success" : "error"
            }`}
          >
            {responseMessage}
          </div>
        )}
        <form
          id="fcf-form-id"
          className="fcf-form-class"
          onSubmit={handleSubmit}
        >
          <div className="fcf-form-group">
            <label htmlFor="Name" className="fcf-label">
              Your Name
            </label>
            <div className="fcf-input-group">
              <input
                type="text"
                id="Name"
                name="name"
                className="fcf-form-control"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Please Enter Your Name"
              />
            </div>
          </div>

          <div className="fcf-form-group">
            <label htmlFor="Email" className="fcf-label">
              Your Email Address
            </label>
            <div className="fcf-input-group">
              <input
                type="email"
                id="Email"
                name="email"
                className="fcf-form-control"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="Please Enter Valid Email"
              />
            </div>
          </div>

          <div className="fcf-form-group">
            <label htmlFor="Message" className="fcf-label">
              Your Message
            </label>
            <div className="fcf-input-group">
              <textarea
                id="Message"
                name="message"
                className="fcf-form-control"
                rows="6"
                maxLength="3000"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type Your Message Here..."
              ></textarea>
            </div>
          </div>

          <div className="fcf-form-group">
            <button
              type="submit"
              id="fcf-button"
              className="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
        </div>
       

        
      </div>
    </div>
  );
};

export default ContactForm;
