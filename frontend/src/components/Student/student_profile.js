import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./student_profile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [appliedJobs, setAppliedJobs] = useState(null);
  const [messages, setMessages] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const excludedFields = ["password", "id"];

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(
          "http://localhost:5000/student_profile"
        );
        const studentId = profileResponse.data.id;

        setProfile(profileResponse.data);
        setFormData(profileResponse.data);

        const [applicationsRes, messagesRes] = await Promise.all([
          axios.get(`http://localhost:5000/students/${studentId}/applications`),
          axios.get(`http://localhost:5000/students/${studentId}/messages`),
        ]);

        setAppliedJobs(applicationsRes.data);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    axios
      .put("http://localhost:5000/update_student_profile", formData)
      .then((response) => {
        setProfile(formData);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      });
  };

  const handleLogOut = () => {
    axios
      .get("http://localhost:5000/logout")
      .then(() => {
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        console.error("Logout Error:", err);
        alert("Logout failed. Please try again.");
      });
  };

  const handleWithdraw = (jobId) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      axios
        .delete(
          `http://localhost:5000/students/${profile.id}/applications/${jobId}`
        )
        .then(() => {
          setAppliedJobs((prevJobs) =>
            prevJobs.filter((job) => job.job_id !== jobId)
          );
          alert("Application withdrawn successfully!");
        })
        .catch((error) => {
          console.error("Withdraw Error:", error);
          alert("Failed to withdraw application. Please try again.");
        });
    }
  };

  if (!profile) {
    return <p className="student-dashboard__loading">Loading profile...</p>;
  }

  return (
    <div className="student-dashboard__container">
      {/* Sidebar */}
      <div className="student-dashboard__sidebar">
        <div className="student-dashboard__sidebar-header">
          <h3>Student Dashboard</h3>
        </div>
        <div className="student-dashboard__nav">
          <button
            className={`student-dashboard__nav-btn ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
          <button
            className={`student-dashboard__nav-btn ${
              activeTab === "jobs" ? "active" : ""
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            Applied Jobs
          </button>
          <button
            className={`student-dashboard__nav-btn ${
              activeTab === "messages" ? "active" : ""
            }`}
            onClick={() => setActiveTab("messages")}
          >
            Your Messages
          </button>
        </div>
        <button
          className="student-dashboard__logout-btn"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="student-dashboard__main">
        {activeTab === "profile" ? (
          <>
            <div className="student-profile__header">
              <h2 className="student-profile__title">My Profile</h2>
              <button
                className="student-profile__edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel Editing" : "Update Profile"}
              </button>
            </div>

            <div className="student-profile__content">
              {isEditing ? (
                <div className="student-profile__edit-form">
                  {Object.keys(formData)
                    .filter((key) => !excludedFields.includes(key))
                    .map((key) => (
                      <div className="student-profile__form-group" key={key}>
                        <label className="student-profile__form-label">
                          {key.replace("_", " ").toUpperCase()}
                        </label>
                        <input
                          className="student-profile__form-input"
                          type="text"
                          name={key}
                          value={formData[key] || ""}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  <button
                    className="student-profile__save-btn"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="student-profile__details">
                  {Object.keys(profile)
                    .filter((key) => !excludedFields.includes(key))
                    .map((key) => (
                      <div className="student-profile__detail-item" key={key}>
                        <strong className="student-profile__detail-label">
                          {key.replace("_", " ").toUpperCase()}:
                        </strong>
                        <span className="student-profile__detail-value">
                          {profile[key]}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        ) : activeTab === "jobs" ? (
          <div className="student-applications__container">
            <h2 className="student-applications__title">Applied Jobs</h2>
            {appliedJobs === null ? (
              <p className="student-applications__loading">
                Loading applied jobs...
              </p>
            ) : appliedJobs.length === 0 ? (
              <p className="student-applications__empty">
                No jobs applied yet.
              </p>
            ) : (
              <div className="student-applications__grid">
                {appliedJobs.map((job) => (
                  <div className="student-application__card" key={job.job_id}>
                    <h3 className="student-application__job-title">
                      {job.title}
                    </h3>
                    <div className="student-application__meta">
                      <span className="student-application__company">
                        {job.company_name}
                      </span>
                      <span
                        className={`student-application__status student-application__status--${job.status}`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="student-application__footer">
                      <span className="student-application__date">
                        Applied: {new Date(job.applied_at).toLocaleDateString()}
                      </span>
                      <button
                        className="student-application__withdraw-btn"
                        onClick={() => handleWithdraw(job.job_id)}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="student-messages__container">
            <h2 className="student-messages__title">Your Messages</h2>
            {messages === null ? (
              <p className="student-messages__loading">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="student-messages__empty">No messages found.</p>
            ) : (
              <div className="student-messages__grid">
                {messages.map((message) => (
                  <div className="student-message__card" key={message.id}>
                    {/* Sender Information */}
                    <div className="student-message__header">
                      <div className="student-message__sender-info">
                        <div className="student-message__name">
                          {message.name}
                        </div>
                        <div className="student-message__email">
                          {message.email}
                        </div>
                      </div>
                      <div className="student-message__date">
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="student-message__content">
                      <div className="student-message__original">
                        <div className="student-message__section-label">
                          Your Message:
                        </div>
                        <p className="student-message__text">
                          {message.message}
                        </p>
                      </div>

                      {message.reply && (
                        <div className="student-message__reply">
                          <div className="student-message__section-label">
                            TPO Reply:
                          </div>
                          <p className="student-message__reply-text">
                            {message.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
