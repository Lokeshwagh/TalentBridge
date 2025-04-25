import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./viewCordinator.css"; // Use a separate CSS file for this component

function ViewCordinator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cordinator, setCordinator] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cordinator/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setCordinator(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coordinator data:", error);
        setError("Error fetching coordinator data: " + error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-cordinator-container">
      <div className="view-cordinator-card">
        <div className="view-cordinator-header">
          <h1 className="view-cordinator-title">Coordinator Details</h1>
          <button
            className="view-cordinator-close"
            onClick={() => navigate(-1)}
          >
            X
          </button>
        </div>
        <div className="view-cordinator-details">
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">Full Name:</strong>{" "}
            {cordinator.full_name}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">Email:</strong>{" "}
            {cordinator.email}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">Phone Number:</strong>{" "}
            {cordinator.phone_number}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">Designation:</strong>{" "}
            {cordinator.designation}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">Institution Name:</strong>{" "}
            {cordinator.institution_name}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">
              Institution Address:
            </strong>{" "}
            {cordinator.institution_address}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">
              Institution Contact:
            </strong>{" "}
            {cordinator.institution_contact}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">
              Institution Email:
            </strong>{" "}
            {cordinator.institution_email}
          </p>
          <p className="view-cordinator-item">
            <strong className="view-cordinator-label">Username:</strong>{" "}
            {cordinator.username}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewCordinator;
