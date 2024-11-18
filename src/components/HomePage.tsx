import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome to Product Management</h1>
        <div style={buttonContainerStyle}>
          <button onClick={() => navigate("/login")} style={buttonStyle}
          >
            Login
          </button>
          <button onClick={() => navigate("/signup")} style={buttonStyle}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

// Style objects
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f4f8", // Light background
  fontFamily: "'Arial', sans-serif",
};

const cardStyle: React.CSSProperties = {
  padding: "40px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
  borderRadius: "10px",
  textAlign: "center",
  width: "300px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  color: "#333333", // Dark text for contrast
  marginBottom: "20px",
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#ffffff",
  backgroundColor: "#007bff", // Primary color
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: "20px",
};

export default HomePage;