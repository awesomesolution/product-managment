import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    try {
    e.preventDefault();

    // Email regex validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email');
    }

    // Password regex validation (8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error('Password must be at least 8 characters, including an uppercase, lowercase, number, and special character');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Call API to create user
    const response = await axios.post(`${API_BASE_URL}auth/signup`, { fullName, email, phone, password })
      if(response){
        toast.success('Signup successfully!'); // Show success message
        navigate("/")
      }
      else {
        toast.error('User is not an admin. Please try again with Admin details.'); // Show error message
      }
    } catch (error) {
        toast.error("Error while signup: " + error);
    }
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Full Name" style={inputStyle} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Phone" style={inputStyle}  value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="password" placeholder="Password" style={inputStyle}  value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" style={inputStyle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button type="submit" style={buttonStyle}>Sign Up</button>
    </form>
    </div>
  );
};

const formStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
export default SignupForm;