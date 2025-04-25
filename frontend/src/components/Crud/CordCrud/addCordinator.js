import React, { useState } from "react";
function AddCordinator() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    designation: "",
    institution_name: "",
    institution_address: "",
    institution_contact: "",
    institution_email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/add_cordinator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("CoOrdinator information added successfully!");
        setFormData({
          full_name: "",
          email: "",
          phone_number: "",
          designation: "",
          institution_name: "",
          institution_address: "",
          institution_contact: "",
          institution_email: "",
          username: "",
          password: "",
        });
      } else {
        alert("Failed to add TPO information.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the information.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Add TPO Details</h2>
      <form className="form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div
            className={`form-group ${
              key === "institution_address" ? "full-width" : ""
            }`}
            key={key}
          >
            <label htmlFor={key}>{key.replace("_", " ").toUpperCase()}</label>
            {key === "institution_address" ? (
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              ></textarea>
            ) : (
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">Add Cordiantor</button>
      </form>
    </div>
  );
}

export default AddCordinator;
