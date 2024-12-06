import React, { useState, useEffect } from "react";
import { supabase } from "../../../utilies/SupaBase";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient"); // Tracks whether it's "patient" or "doctor"
  const [blur, setBlur] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [gifMessage, setGifMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "patient") {
        navigate("/");
      } else if (userRole === "doctor") {
        navigate("");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBlur(true);

    try {
      const adminEmail = import.meta.env.VITE_ADMIN;
      const adminPasskey = import.meta.env.VITE_PASSKEY;

      if (email === adminEmail && password === adminPasskey) {
        setGifMessage("Admin Login Successful");
        setShowGif(true);
        setTimeout(() => {
          localStorage.setItem("userRole", "admin");
          navigate("/");
        }, 1500);
        return;
      }

      const table = userType === "patient" ? "patientsdata" : "DoctorsData";
      const { data, error } = await supabase
        .from(table)
        .select("*", { headers: { Accept: "application/json" } })
        .eq("email_id", email)
        .eq("password", password)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setGifMessage(`${userType === "patient" ? "Patient" : "Doctor"} Login Successful`);
        setShowGif(true);
        setTimeout(() => {
          localStorage.setItem("userRole", userType);
          localStorage.setItem(
            `${userType}Data`,
            JSON.stringify({
              userId: data.id,
              ...data,
            })
          );
          navigate(userType === "patient" ? "/" : "/doctor/dashboard");
        }, 1500);
        return;
      }

      setGifMessage("Invalid Credentials");
      setShowGif(true);
      setTimeout(() => setShowGif(false), 1500);
    } catch (error) {
      setGifMessage("Invalid Credentials");
      setShowGif(true);
      setTimeout(() => setShowGif(false), 1500);
    } finally {
      setLoading(false);
      setBlur(false);
    }
  };

  // const handleNewPatientRegistration = () => {
  //   console.log("Navigating to signup...");

  //   navigate("/signup");
  // };

  return (
    <div className="login-container">
      {/* Blur effect while loading */}
      {loading || blur ? <div className="blur-background"></div> : null}

      {/* GIF display */}
      {showGif && (
        <div className="gif-container">
          <img
            src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e47l2mubft6j3ziu9t1qbgvfkfngodcfrx0efthlwlz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Loading..."
          />
          <p>{gifMessage}</p>
        </div>
      )}

      <div className={`login ${showGif ? "hidden" : ""}`}>
        <h2>{userType === "patient" ? "Patient Login" : "Doctor Login"}</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label className="form-label">User Type</label>
            <select
              className="form-input"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        {userType === "patient" && (
        <p>Creat a new account  <Link to="/signup">Go to Signup</Link></p>
       
        )}
      </div>
    </div>
  );
};

export default Login;