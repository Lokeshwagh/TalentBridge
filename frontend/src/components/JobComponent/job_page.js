import React, { useEffect, useState } from "react";
import axios from "axios";
import "./job_page.css"; // Assuming you have a corresponding CSS file

function Job() {
  // State variables for managing jobs and filters
  const [jobs, setJobs] = useState([]); // Stores all job listings
  const [selectedJob, setSelectedJob] = useState(null); // Currently selected job for detailed view
  const [showSidebar, setShowSidebar] = useState(false); // Controls sidebar visibility

  // Filter state variables
  const [filterField, setFilterField] = useState(""); // Skills filter
  const [filterSalary, setFilterSalary] = useState(""); // Salary filter
  const [filterEmploymentType, setFilterEmploymentType] = useState(""); // Employment type filter
  const [filterExperience, setFilterExperience] = useState(""); // Experience filter

  // Fetch jobs from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log(err));
  }, []);

  // Handler to view job details
  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  // Handler to close job details popup
  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Advanced filtering logic
  const filteredJobs = jobs.filter((job) => {
    // Check if job matches skills filter
    const matchesSkills = job.skills_required
      .toLowerCase()
      .includes(filterField.toLowerCase());

    // Check if job matches salary filter
    const matchesSalary = filterSalary
      ? job.salary && parseInt(job.salary) >= parseInt(filterSalary)
      : true;

    // Check if job matches employment type filter
    const matchesEmploymentType = filterEmploymentType
      ? job.employment_type
          .toLowerCase()
          .includes(filterEmploymentType.toLowerCase())
      : true;

    // Check if job matches experience filter
    const matchesExperience = filterExperience
      ? job.experience_required &&
        parseInt(job.experience_required) >= parseInt(filterExperience)
      : true;

    // Return job only if all filters match
    return (
      matchesSkills &&
      matchesSalary &&
      matchesEmploymentType &&
      matchesExperience
    );
  });

  // Render job section for different company types
  const renderJobSection = (title, filterType) => {
    const sectionJobs = filteredJobs.filter(
      (job) => job.company_type === filterType
    );

    // Add this function near other handlers
    const handleApplyJob = async (jobId) => {
      const studentId = localStorage.getItem("student_id");
      if (!studentId) {
        alert("Please login first!");
        return;
      }

      try {
        await axios.post("http://localhost:5000/applications", {
          student_id: studentId,
          job_id: jobId,
        });
        alert("Application submitted successfully!");
      } catch (err) {
        console.error("Application error:", err);
        alert("You've already applied to this job!");
      }
    };

    return (
      <div className="companies-section">
        <h2>{title}</h2>
        <div className="job-list">
          {sectionJobs.map((job) => (
            <div key={job.job_id} className="job-card">
              <h2>{job.title}</h2>
              <p>{job.company_name}</p>
              <p>{job.location}</p>
              <p>{job.salary ? `$${job.salary}` : "Salary not specified"}</p>
              <div className="job-actions">
                <button
                  className="details-button"
                  aria-label={`View details of ${job.title} at ${job.company_name}`}
                  onClick={() => handleViewDetails(job)}
                >
                  View Details
                </button>
                <button
                  className="apply-button"
                  onClick={() => handleApplyJob(job.job_id)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="job-page">
      {/* Job page header with search and filter button */}
      <div className="job-header">
        <button
          className="filter-button"
          aria-label="Filter Jobs"
          onClick={toggleSidebar}
        >
          Filter
        </button>
        <input
          type="text"
          className="search-box"
          placeholder="Search for jobs..."
          aria-label="Search Jobs"
          onChange={(e) => setFilterField(e.target.value)}
        />
      </div>

      {/* Render job sections */}
      {renderJobSection("Upcoming Companies", "Upcoming")}
      {renderJobSection("Current Companies", "Current")}
      {renderJobSection("Partner Companies", "Partner")}

      {/* Job details popup */}
      {selectedJob && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <h2>{selectedJob.title}</h2>
            <p>
              <strong>Job ID:</strong> {selectedJob.job_id}
            </p>
            <p>
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <p>
              <strong>Company:</strong> {selectedJob.company_name}
            </p>
            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p>
              <strong>Employment Type:</strong> {selectedJob.employment_type}
            </p>
            <p>
              <strong>Salary:</strong>{" "}
              {selectedJob.salary || "Salary not specified"}
            </p>
            <p>
              <strong>Posted Date:</strong> {selectedJob.posted_date}
            </p>
            <p>
              <strong>Closing Date:</strong> {selectedJob.closing_date}
            </p>
            <p>
              <strong>Skills Required:</strong> {selectedJob.skills_required}
            </p>
            <p>
              <strong>Experience Required:</strong>{" "}
              {selectedJob.experience_required}
            </p>
            <p>
              <strong>Job Category:</strong> {selectedJob.job_category}
            </p>
            <p>
              <strong>Application Link:</strong>
              <a
                href={selectedJob.application_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedJob.application_link}
              </a>
            </p>
            <p>
              <strong>Company Type:</strong> {selectedJob.company_type}
            </p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Filter sidebar */}
      {showSidebar && (
        <div className="sidebar-overlay">
          <div className="filter-sidebar">
            <button className="sidebar-close" onClick={toggleSidebar}>
              X
            </button>
            <h2>Filter Jobs</h2>

            {/* Skills filter */}
            <div className="filter-section">
              <label htmlFor="job-filter">Skills Required:</label>
              <input
                id="job-filter"
                type="text"
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
                placeholder="Enter skills..."
              />
            </div>

            {/* Salary filter */}
            <div className="filter-section">
              <label htmlFor="salary-filter">Minimum Salary:</label>
              <input
                id="salary-filter"
                type="number"
                value={filterSalary}
                onChange={(e) => setFilterSalary(e.target.value)}
                placeholder="Enter minimum salary..."
              />
            </div>

            {/* Employment Type dropdown filter */}
            <div className="filter-section">
              <label htmlFor="employment-type-filter">Employment Type:</label>
              <select
                id="employment-type-filter"
                value={filterEmploymentType}
                onChange={(e) => setFilterEmploymentType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="full-time">Full-Time</option>
                <option value="internship">Internship</option>
                <option value="training">Training</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            {/* Experience filter */}
            <div className="filter-section">
              <label htmlFor="experience-filter">Years of Experience:</label>
              <input
                id="experience-filter"
                type="number"
                value={filterExperience}
                onChange={(e) => setFilterExperience(e.target.value)}
                placeholder="Enter years of experience..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;
