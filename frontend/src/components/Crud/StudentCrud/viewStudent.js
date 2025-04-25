import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./viewStudent.css";

function ViewStudent() {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((response) => {
        setStudent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching student data: " + error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-student-container">
      <button className="cancel-button" onClick={() => navigate(-1)}>
        X
      </button>
      <h1 className="view-student-header">Student Details</h1>
      <div className="view-student-details">
        <p>
          <strong>First Name:</strong> {student.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {student.last_name}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {student.phone_number}
        </p>
        <p>
          <strong>City:</strong> {student.city}
        </p>
        <p>
          <strong>State:</strong> {student.state}
        </p>
        <p>
          <strong>Skills:</strong> {student.skills}
        </p>
        <p>
          <strong>Date of Birth:</strong> {student.dob}
        </p>
        <p>
          <strong>Passing Year:</strong> {student.passing_year}
        </p>
        <p>
          <strong>Qualification:</strong> {student.qualification}
        </p>
        <p>
          <strong>Stream:</strong> {student.stream}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(student.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(student.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ViewStudent;
