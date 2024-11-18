import React, { useState } from 'react';
// import { BrowserRouter as  Navigate, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import default styles
import SignupForm from './components/SignupForm'; // Adjust the path based on your folder structure
import LoginForm from './components/LoginForm';   // Adjust the path based on your folder structure
import Menu from './components/Menu';   // Adjust the path based on your folder structure
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

function App() {

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (email: string, password: string) => {
    // You can handle the login logic here (e.g., API request)
    // After successful login, navigate to another page (e.g., Dashboard or Home page)
    setIsLoggedIn(true);
  };


  // Redirect component
  const RedirectToHome: React.FC = () => {
    const navigate = useNavigate();

    // Redirect to the home page
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);

    return null; // No UI is displayed, just a redirect
  };

  return (
    <div className="App">
      <ToastContainer /> {/* Toast container for displaying messages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />}>
          <Route path="product-list" element={<ProductList />} />
          <Route path="add" element={<AddProductForm />} />
          <Route path="edit/:productId" element={<AddProductForm />} />
        </Route>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/menu"
          element={isLoggedIn ? <Menu /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<RedirectToHome />} />
      </Routes>
    </div>
  );
}

export default App;
