import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eqImage from "./eq.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.userName,
          email: formData.email,
          phone: formData.mobile,
          dob: formData.dob,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px", padding: "20px", border: "1px solid black", borderRadius: "10px" }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="userName" placeholder="Enter User Name" value={formData.userName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Enter User Email ID" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="mobile" placeholder="Enter Mobile Number" value={formData.mobile} onChange={handleChange} required />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <label>
            <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required />
            I agree to <a href="#">Terms & Conditions</a>
          </label>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
