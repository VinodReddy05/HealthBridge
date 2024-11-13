import React, { useState } from 'react';
import { supabase } from '../../../utilies/SupaBase';
import { useNavigate } from 'react-router-dom';
import './Login.scss'

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // First, check the patientsdata table
      const { data: patientData, error: patientError } = await supabase
        .from('patientsdata')
        .select('*')
        .eq('email_id', email)
        .eq('password', password)
        .single();

      if (patientError && patientError.code !== 'PGRST116') { // Skip if no patient found
        throw patientError;
      }

      if (patientData) {
        alert('Patient Login Successful');
        return navigate(`/patients/${patientData.id}`);
      }

      // If no patient is found, check the doctorsdata table
      const { data: doctorData, error: doctorError } = await supabase
        .from('DoctorsData')
        .select('*')
        .eq('email_id', email)
        .eq('password', password)
        .single();

      if (doctorError && doctorError.code !== 'PGRST116') {
        throw doctorError;
      }

      if (doctorData) {
        alert('Doctor Login Successful');
        return navigate(`/DoctorsDashaboard`);
        // navigate(`/`)
      }

      // If neither patient nor doctor was found
      setErrorMessage('Invalid email or password. Please try again.');

    } catch (error) {
      setErrorMessage('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
     <div className="login">
     <h2>Login</h2>
      <form className='login-form' onSubmit={handleLogin}>
        <div>
          <label className="form-label" >Email</label>
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
        <button type="submit" className="submit-button">Login</button>
      </form>
     </div>
  
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
