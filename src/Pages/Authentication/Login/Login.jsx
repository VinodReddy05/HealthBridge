import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../../utilies/SupaBase";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

import { HashLoader } from "react-spinners";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [blur, setBlur] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      if (userRole === "admin") {
        navigate("/");
      } else if (userRole === "patient") {
        navigate("/patients/dashboard");
      } else if (userRole === "doctor") {
        navigate("/doctors/dashboard");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBlur(true)

    try {
      const adminEmail = import.meta.env.VITE_ADMIN;
      const adminPasskey = import.meta.env.VITE_PASSKEY;

      if (email === adminEmail && password === adminPasskey) {
        toast.success("Admin Login Successful", { theme: "dark" });
        setTimeout(() => {
          localStorage.setItem("userRole", "admin");
          navigate("/");
        }, 1500);
        return;
      }

      const { data: patientData, error: patientError } = await supabase
        .from("patientsdata")
        .select("*")
        .eq("email_id", email)
        .eq("password", password)
        .single();

      if (patientError && patientError.code !== "PGRST116") {
        throw patientError;
      }

      if (patientData) {
        toast.success("Patient Login Successful", { theme: "dark" });
        setTimeout(() => {
          setBlur(true);  
          localStorage.setItem("userRole", "patient");
          localStorage.setItem("patientData", JSON.stringify({
            userId: patientData.id,
            ...patientData,
          }));
          navigate("/patients/dashboard");
        }, 3000);
        return;
      }

      const { data: doctorData, error: doctorError } = await supabase
        .from("DoctorsData")
        .select("*")
        .eq("email_id", email)
        .eq("password", password)
        .single();

      if (doctorError && doctorError.code !== "PGRST116") {
        throw doctorError;
      }

      if (doctorData) {
        toast.success("Doctor Login Successful", { theme: "dark" });
        setTimeout(() => {
          localStorage.setItem("userRole", "doctor");
          localStorage.setItem("doctorData", JSON.stringify({
            userId: doctorData.id,
            ...doctorData,
          }));
          navigate("/doctors/dashboard");
        }, 1500);
        return;
      }
    } catch (error) {
      toast.error("Invalid Credentials", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading || blur ? <div className="blur-background"></div> : null}

      <div className="login">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
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

          {loading && (
            <div className="spinner-container">
              <HashLoader color="#36d7b7" loading={loading} size={50} />
            </div>
          )}

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
