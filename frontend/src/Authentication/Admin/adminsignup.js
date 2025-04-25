import React, { useState } from "react";
import "./adminsignup.css";  // Make sure to create and style this CSS file

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    organizationName: "",
    department: "",
    officeAddress: "",
    securityQuestion: "",
    twoFactor: false,
    adminId: "",
    yearsOfExperience: "",
    certifications: "",
    profilePicture: null,
    linkedinProfile: "",
    emergencyContact: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="admin-signup-container">
      <h2>Admin Registration Form</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Personal Information */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Login Credentials */}
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role/Designation */}
        <div className="form-group">
          <label htmlFor="designation">Designation/Role *</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        {/* Organization Details */}
        <div className="form-group">
          <label htmlFor="organizationName">Organization Name *</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="officeAddress">Office Address *</label>
          <input
            type="text"
            id="officeAddress"
            name="officeAddress"
            value={formData.officeAddress}
            onChange={handleChange}
            required
          />
        </div>

        {/* Security and Verification */}
        <div className="form-group">
          <label htmlFor="securityQuestion">Security Question</label>
          <input
            type="text"
            id="securityQuestion"
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="twoFactor">Enable Two-Factor Authentication</label>
          <input
            type="checkbox"
            id="twoFactor"
            name="twoFactor"
            checked={formData.twoFactor}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="adminId">Admin ID *</label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            value={formData.adminId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Professional Information */}
        <div className="form-group">
          <label htmlFor="yearsOfExperience">Years of Experience *</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="certifications">Professional Certifications</label>
          <input
            type="text"
            id="certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
          />
        </div>

        {/* Additional Information */}
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="linkedinProfile">LinkedIn Profile</label>
          <input
            type="url"
            id="linkedinProfile"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergencyContact">Emergency Contact</label>
          <input
            type="tel"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
        </div>

        {/* Consent */}
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms">
            I agree to the <a href="/terms">Terms and Conditions</a> and{" "}
            <a href="/privacy">Privacy Policy</a>
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        If you have an account, please <a href="./adminlogin">Login</a>
      </p>
    </div>
  );
};

export default AdminSignup;
