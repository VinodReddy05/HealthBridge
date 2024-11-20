import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss"; // Add your styles here

const LandingPage = ({setIsLandingPage }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");


  const handleLogin =()=>{
    navigate('/login')
  }
  useEffect(() => {
    setIsLandingPage(true); // Set the flag after the landing page is loaded
  }, [setIsLandingPage]);


  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="logo">Your Website Logo</div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </header>
      <main className="content">
        <h1>Welcome to [Your Website Name]</h1>
        <p>Your tagline or a brief description of the website.</p>
      </main>
    </div>
  );
};

export default LandingPage;
