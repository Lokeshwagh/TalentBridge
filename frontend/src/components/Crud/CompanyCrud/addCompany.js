import React, { useState } from "react";
import "./addCompany.css"; // Ensure CSS file is properly imported

function AddCompany() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    employment_type: "",
    salary: "",
    posted_date: "",
    closing_date: "",
    skills_required: "",
    experience_required: "",
    job_category: "",
    application_link: "",
    company_type: "", // This will be a dropdown
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/add_company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Job information added successfully!");
        setFormData({
          title: "",
          description: "",
          company_name: "",
          location: "",
          employment_type: "",
          salary: "",
          posted_date: "",
          closing_date: "",
          skills_required: "",
          experience_required: "",
          job_category: "",
          application_link: "",
          company_type: "", // Reset the dropdown value
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add job information: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while adding the information. Please try again."
      );
    }
  };

  const formatLabel = (label) => {
    // Format labels to be more readable
    return label
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

  return (
    <div className="form-container">
      <h2>Add Job Details</h2>
      <form className="form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div
            className={`form-group ${
              key === "description" ? "full-width" : ""
            }`}
            key={key}
          >
            <label htmlFor={key}>{formatLabel(key)}</label>
            {key === "description" ? (
              <textarea
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              ></textarea>
            ) : key === "company_type" ? (
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              >
                <option value="">Select Company Type</option>
                <option value="current">Current</option>
                <option value="upcoming">Upcoming</option>
                <option value="partner">Partner</option>
              </select>
            ) : (
              <input
                type={key.includes("date") ? "date" : "text"}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddCompany;
