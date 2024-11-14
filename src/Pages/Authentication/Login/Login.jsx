import React, { useState } from 'react';
import { supabase } from '../../../utilies/SupaBase';
import { useNavigate } from 'react-router-dom';
import './Login.scss'

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // First, check the patientsdata table
      const { data: patientData, error: patientError } = await supabase
        .from('patientsdata')
        .select('*', { headers: { 'Accept': 'application/json' } })
        .eq('email_id', email)
        .eq('password', password)
        .single();

      if (patientError && patientError.code !== 'PGRST116') { // Skip if no patient found
        throw patientError;
      }

      if (patientData) {
        alert('Patient Login Successful');
         navigate('/patients/dashboard');
         localStorage.setItem('patientData', JSON.stringify({
          userId: patientData.id, 
          ...patientData 
        }));
      
        console.log(`Patient ID: ${patientData.id}`);
        console.log(`Patient Name: ${patientData.name}`);
         
      }

      // If no patient is found, check the doctorsdata table
      const { data: doctorData, error: doctorError } = await supabase
        .from('DoctorsData')
        .select('*', { headers: { 'Accept': 'application/json' } })
        .eq('email_id', email)
        .eq('password', password)
        // .eq('user' , userId )
        .single();

      if (doctorError && doctorError.code !== 'PGRST116') {
        throw doctorError;
      }

      if (doctorData) {
        alert('Doctor Login Successful');
         navigate(`/doctors/dashboard`);

        localStorage.setItem('doctorData', JSON.stringify({
          userId: doctorData.id, 
          ...doctorData 
        }));
        console.log(`doctor ID: ${doctorData.id}`);
        console.log(`doctor Name: ${doctorData.name}`);
      }
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
