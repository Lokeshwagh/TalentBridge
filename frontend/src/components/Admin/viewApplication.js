import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewApplication() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="view-application-container">
      <h1>Job Applications</h1>
      <table className="job-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Title</th>
            <th>Company Name</th>
            <th>View Applications</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.title}</td>
              <td>{job.company_name}</td>
              <td>
                <button
                  onClick={() => navigate(`/jobs/${job.job_id}/applications`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewApplication;
