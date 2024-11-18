import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface LoginFormProps {
    onLogin: (email: string, password: string) => void; // Prop for login action
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Basic input validation
            if (!email?.trim() || !password?.trim()) {
                throw new Error('Email and password are required');
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Password strength validation (example: minimum 8 characters)
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            // Call API to create user
            const response = await axios.post(`${API_BASE_URL}auth/login`, { email, password });
            debugger
            if (response?.data?.userDetails) {
                toast.success('LoggedIn successfully!'); // Show success message
                localStorage.setItem('userId', response?.data?.userDetails?._id);
                onLogin(email, password);
                navigate("/menu");
            } else {
                toast.error('User is not an admin. Please try again with Admin details.'); // Show error message
            }
        } catch (error) {
            toast.error("Error while login: " + error);
        }
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2 style={titleStyle}>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
        </div>
    );
};

// Style objects
const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f9fc",
    fontFamily: "'Arial', sans-serif",
};

const formStyle: React.CSSProperties = {
    width: "300px",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    color: "#333333",
    marginBottom: "20px",
    textAlign: "center",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    border: "1px solid #cccccc",
    borderRadius: "5px",
    boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

export default LoginForm;