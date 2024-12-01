import React, { useState } from "react";
import { supabase } from "../../../utilies/SupaBase";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setPasswordError(""); // Reset the password error message
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase
        .from("patientsdata")
        .insert([{ name, email_id: email, password }]);

      if (error) throw error;

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Error registering new patient: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>New Patient Registration</h2>
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            minLength={6} // Set minimum password length
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>} {/* Show error message */}
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
