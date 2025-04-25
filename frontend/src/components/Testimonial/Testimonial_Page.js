import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Testimonial_Page.css";
import Testimonial_BreadCrumb from "../../assets/images/Testimonial_BG/testi_BG.png";

// Import multiple testimonial images
// ... your imports
import Testimonial1 from "../../assets/images/Testimonial_BG/testimonial1.jpeg";
import Testimonial2 from "../../assets/images/Testimonial_BG/testimonial2.jpeg";
import Testimonial3 from "../../assets/images/Testimonial_BG/testimonial3.jpeg";
import Testimonial4 from "../../assets/images/Testimonial_BG/testimonial4.jpeg";
import Testimonial5 from "../../assets/images/Testimonial_BG/testimonial5.jpeg";

const testimonialImages = [Testimonial1, Testimonial2, Testimonial3, Testimonial4, Testimonial5];

const renderStars = (rating) =>
  "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

const TestimonialCard = ({
  name,
  email,
  testimonial,
  rating,
  placed_company,
  image,
}) => (
  <div className="testimonial-card">
    <div className="card-header">
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
    </div>
    <p>Company : {placed_company}</p>
    <p className="card-text">{testimonial}</p>
    <div className="card-rating">{renderStars(rating)}</div>
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/testimonial");
        setTestimonials(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch testimonials");
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials">
      <div
        className="header-section"
        style={{ backgroundImage: `url(${Testimonial_BreadCrumb})` }}
      >
        <h1>Testimonials</h1>
        <h2>What Customers Are Saying</h2>
      </div>

      <div className="highlight-section">
        <h2>Our Alumni</h2>
        <p>
          We've been building creative tools together for over a decade and have
          a deep appreciation for software applications and AI tools.
        </p>
      </div>

      {loading ? <p>Loading testimonials...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => {
          const image = testimonialImages[index % testimonialImages.length]; // Loop through images
          return (
            <TestimonialCard key={index} {...testimonial} image={image} />
          );
        })}
      </div>

      <div className="spacer"></div>
    </div>
  );
};

export default Testimonials;
