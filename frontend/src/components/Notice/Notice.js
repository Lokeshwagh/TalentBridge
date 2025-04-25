import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notice.css";

const Notice = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("notice");
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});

  // Fetch notices from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:5000/shownotice");
        const text = await response.text();
        console.log("Raw Response:", text);
        const data = JSON.parse(text);
        setNotices(data);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError("Failed to load notices");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Fetch student messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/studentmessages");
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages");
      }
    };

    fetchMessages();
  }, []);

  // Function to handle section change
  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  // Function to go back
  const handleGoBack = () => {
    navigate("/admin");
  };

  // Function to add a new notice
  const handleAddNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/addnotice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newNoticeTitle,
          content: newNoticeContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to add notice");

      const newNotice = await response.json();
      setNotices([newNotice, ...notices]);
      setShowAddNoticeModal(false);
      setNewNoticeTitle("");
      setNewNoticeContent("");
    } catch (error) {
      console.error("Error adding notice:", error);
      setError("Failed to add notice");
    }
  };
  const handleReplyChange = (id, value) => {
    setReplies({ ...replies, [id]: value });
  };

  const submitReply = (id) => {
    axios
      .put(`http://localhost:5000/replymessage/${id}`, { reply: replies[id] })
      .then(() => {
        alert("Reply sent successfully");
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, reply: replies[id] } : msg
          )
        );
      })
      .catch((err) => console.error("Error sending reply:", err));
  };
  // Add handleDeleteNotice function
  const handleDeleteNotice = async (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/deletenotice/${noticeId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Failed to delete notice");

        setNotices(notices.filter((notice) => notice.id !== noticeId));
      } catch (error) {
        console.error("Error deleting notice:", error);
        setError("Failed to delete notice");
      }
    }
  };

  return (
    <div className="notice-container">
      <div className="sidebar">
        <button
          className={`sidebar-button ${
            selectedSection === "notice" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("notice")}
        >
          Notices
        </button>
        <button
          className={`sidebar-button ${
            selectedSection === "studentMsg" ? "active" : ""
          }`}
          onClick={() => handleSectionChange("studentMsg")}
        >
          Student Messages
        </button>
        <button className="sidebar-button back-button" onClick={handleGoBack}>
          Go Back
        </button>
      </div>

      <div className="content-area">
        {isLoading && <div className="loading">Loading notices...</div>}
        {error && <div className="error">Error: {error}</div>}

        {/* Notice Section */}
        {selectedSection === "notice" && (
          <div className="notice-section">
            <h2>College Notices</h2>
            <button
              className="add-notice"
              onClick={() => setShowAddNoticeModal(true)}
            >
              Add Notice
            </button>

            {notices.map((notice) => (
              <div key={notice.id} className="notice-card">
                <h3>{notice.title}</h3>
                <p>{notice.content}</p>
                <div className="notice-date">
                  {new Date(notice.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}

            {showAddNoticeModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Add New Notice</h3>
                  <form onSubmit={handleAddNotice}>
                    <div className="form-group">
                      <label>Title:</label>
                      <input
                        type="text"
                        value={newNoticeTitle}
                        onChange={(e) => setNewNoticeTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Content:</label>
                      <textarea
                        value={newNoticeContent}
                        onChange={(e) => setNewNoticeContent(e.target.value)}
                        required
                      />
                    </div>
                    <div className="modal-buttons">
                      <button
                        type="button"
                        onClick={() => setShowAddNoticeModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit">Add Notice</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Student Messages Section */}
        {selectedSection === "studentMsg" && (
          <div className="message-section">
            <h2>Student Messages</h2>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <p>
                  <strong>Name:</strong> {msg.name}
                </p>
                <p>
                  <strong>Email:</strong> {msg.email}
                </p>
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
                <p>
                  <strong>Reply:</strong>{" "}
                  {msg.reply ? msg.reply : "No reply yet"}
                </p>
                <textarea
                  placeholder="Write a reply..."
                  value={replies[msg.id] || ""}
                  onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                />
                <button onClick={() => submitReply(msg.id)}>Send Reply</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;
