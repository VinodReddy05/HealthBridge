import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../../utilies/SupaBase';
import NavBar from '../../../../../Components/NavBar/NavBar';
import './AppointmentSchedule.scss';

const AppointmentSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true); 
      setError(null); 
  
      const patientDataString = localStorage.getItem('patientData');
      if (!patientDataString) {
        throw new Error('Patient information is not found. Please log in.');
      }
  
      const patientData = JSON.parse(patientDataString);
      if (!patientData.id) {
        throw new Error('Invalid patient data. Missing patient ID.');
      }
  
      const { data, error } = await supabase
        .from('Appointments')
        .select(`
          id,
          patient_id,
          patient_name,
          doctor_id,
          date_time,
          doctor_name,
          doctor_specialization,
          doctor_image,
          doctor_designation
        `)
        .eq('patient_id', patientData.id)
        .order('date_time', { ascending: true });
  
      if (error) {
        throw error;
      }
  
      setAppointments(data); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAppointments();
  }, []);



  if (error) return <p>Error: {error}</p>;


  return (
    <div className="appointment-schedule">
      <NavBar onSearch={query => setSearchQuery(query)} />

      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <ul>
          {appointments.length > 0 ? (
            appointments.map(appointment => (
              <li key={appointment.id}>
                <img src={appointment.doctor_image} alt="" />
                <p><strong>Doctor Name:</strong> {appointment.doctor_name}</p>
                <p><strong>Specialization:</strong> {appointment.doctor_specialization}</p>
                <p><strong>Date & Time:</strong> {appointment.date_time}</p>
              </li>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AppointmentSchedule;
