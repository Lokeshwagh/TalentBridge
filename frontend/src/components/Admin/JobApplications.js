import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // ADDED: Import for Excel export
import { FaDownload } from "react-icons/fa";
import "./JobApplications.css";

function JobApplications() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // ADDED: Excel download handler
  const handleDownloadExcel = () => {
    if (applications.length === 0) return;

    const worksheetData = [
      ["Student ID", "Name", "Email", "Status", "Applied At"],
      ...applications.map((app) => [
        app.student_id,
        `${app.first_name} ${app.last_name}`,
        app.email,
        app.status,
        new Date(app.applied_at).toLocaleString(),
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, `job-applications-${jobId}.xlsx`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const jobResponse = await fetch(`http://localhost:5000/jobs/${jobId}`);
        if (!jobResponse.ok) {
          throw new Error(`Job details failed: ${jobResponse.status}`);
        }
        const jobData = await jobResponse.json();

        const appsResponse = await fetch(
          `http://localhost:5000/jobs/${jobId}/applications`
        );
        if (!appsResponse.ok) {
          const errorData = await appsResponse.json();
          throw new Error(
            errorData.error || `Applications failed: ${appsResponse.status}`
          );
        }
        const appsData = await appsResponse.json();

        if (!Array.isArray(appsData)) {
          throw new Error("Invalid applications data format");
        }

        setJobDetails(jobData);
        setApplications(appsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId, retryCount]);

  const handleRetry = () => {
    setError(null);
    setRetryCount((prev) => prev + 1);
  };

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={handleRetry}>Retry</button>
          <button onClick={() => navigate(-1)}>Back to Jobs</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="job-applications-container">
      {/* MODIFIED: Added header actions container */}
      <div className="header-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back to Jobs
        </button>
        <button
          onClick={handleDownloadExcel}
          className="download-button"
          disabled={applications.length === 0}
        >
          <FaDownload /> Download Excel
        </button>
      </div>

      {jobDetails && (
        <div className="job-header">
          <h2>
            {jobDetails.title} - {jobDetails.company_name}
          </h2>
          <p className="applications-count">
            Applications Received: {applications.length}
          </p>
        </div>
      )}

      {applications.length > 0 ? (
        <div className="table-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Applied At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={`${application.student_id}-${jobId}`}>
                  <td>{application.student_id}</td>
                  <td>
                    {application.first_name} {application.last_name}
                  </td>
                  <td>
                    <a
                      href={`mailto:${application.email}`}
                      className="email-link"
                    >
                      {application.email}
                    </a>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td>
                    {new Date(application.applied_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-applications">
          No applications found for this job posting.
        </div>
      )}
    </div>
  );
}

export default JobApplications;
