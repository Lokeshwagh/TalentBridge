import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./viewDrive.css";

function ViewDrive() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drives, setDrive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/drive/${id}`)
      .then((response) => {
        setDrive(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching drive data: " + error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-drive-container">
      <div className="view-drive-card">
        <div className="view-drive-header">
          <h1 className="view-drive-title">Drive Details</h1>
          <button className="view-drive-close" onClick={() => navigate(-1)}>
            X
          </button>
        </div>
        <div className="view-drive-details">
          <p className="view-drive-item">
            <strong className="view-drive-label">Company Name:</strong>{" "}
            {drives.company_name}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Description:</strong>{" "}
            {drives.description}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Job Title:</strong>{" "}
            {drives.title}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Company Location:</strong>{" "}
            {drives.location}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Employment Type:</strong>{" "}
            {drives.employment_type}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Salary:</strong>{" "}
            {drives.salary}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">
              Registration Closing Date:
            </strong>{" "}
            {drives.closing_date}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Skills Required:</strong>{" "}
            {drives.skills_required}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Experience Required:</strong>{" "}
            {drives.experience_required}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Job Category:</strong>{" "}
            {drives.job_category}
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Application Link:</strong>
            <a
              href={drives.application_link}
              target="_blank"
              rel="noopener noreferrer"
              className="view-drive-link"
            >
              {drives.application_link}
            </a>
          </p>
          <p className="view-drive-item">
            <strong className="view-drive-label">Company Type:</strong>{" "}
            {drives.company_type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewDrive;
