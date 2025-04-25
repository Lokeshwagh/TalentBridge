import React, { useEffect, useState } from "react";
import "./StudentNotice.css";

function StudentNotice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/shownotice")
      .then((response) => response.json())
      .then((data) => setNotices(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="notice-board">
      <h1 className="board-title">College Notices</h1>

      <div className="notices-container">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <div className="notice-header">
              <h2 className="notice-title">{notice.title}</h2>
              <span className="notice-date">
                {new Date(notice.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className="notice-content">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentNotice;
