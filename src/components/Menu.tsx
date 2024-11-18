import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

const Menu = () => {
    const [currentTab,] = useState("dashboard");
    const navigate = useNavigate();
    const handleLogout = () => {
        // Perform logout logic if needed (e.g., clearing session, tokens)
        console.log("User logged out");
        navigate("/"); // Redirect to the home page
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Navigation Sidebar */}
            <nav style={navStyle}>
                <h3>Menu</h3>
                <button onClick={() => navigate("/menu/product-list")} style={buttonStyle}>
                    Product List
                </button>
                <button onClick={() => navigate("/menu/add")} style={buttonStyle}>
                    Add Product
                </button>
                <button onClick={handleLogout} style={logoutButtonStyle}>
                    Logout
                </button>
            </nav>

            {/* Main Content */}
            <main style={mainStyle}>
                {currentTab === "dashboard" && <h2>Welcome to Dashboard</h2>}
                <Outlet />
            </main>
        </div>
    );
};
const navStyle: React.CSSProperties = {
    width: "200px",
    padding: "10px",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
};

const buttonStyle: React.CSSProperties = {
    padding: "10px",
    margin: "5px 0",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
};

const logoutButtonStyle: React.CSSProperties = {
    padding: "10px",
    marginTop: "auto", // Push the logout button to the bottom
    backgroundColor: "#f44336", // Red color
    color: "white",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    border: "none",
    borderRadius: "4px",
};

const mainStyle: React.CSSProperties = {
    padding: "20px",
    flexGrow: 1,
};
export default Menu;