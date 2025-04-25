
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./viewTestimonial.css"; // Use a separate CSS file for this component

function ViewTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/testimonial/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setTestimonial(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching testimonial data:", error);
        setError("Error fetching testimonial data: " + error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-testimonial-container">
      <div className="view-testimonial-card">
        <div className="view-testimonial-header">
          <h1 className="view-testimonial-title">Testimonial Details</h1>
          <button
            className="view-testimonial-close"
            onClick={() => navigate(-1)}
          >
            X
          </button>
        </div>
        <div className="view-testimonial-details">
          <p className="view-testimonial-item">
            <strong className="view-testimonial-label">Name:</strong> {testimonial.name}
          </p>
          <p className="view-testimonial-item">
            <strong className="view-testimonial-label">Email:</strong> {testimonial.email}
          </p>
          <p className="view-testimonial-item">
            <strong className="view-testimonial-label">Message:</strong> {testimonial.testimonial}
          </p>
          <p className="view-testimonial-item">
            <strong className="view-testimonial-label">Date:</strong> {testimonial.rating}
          </p>
          <p className="view-testimonial-item">
            <strong className="view-testimonial-label">created_at:</strong> {testimonial.created_at}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewTestimonial;