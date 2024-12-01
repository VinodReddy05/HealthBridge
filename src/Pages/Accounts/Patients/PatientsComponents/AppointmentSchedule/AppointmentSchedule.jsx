import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../../utilies/SupaBase';
import NavBar from '../../../../../Components/NavBar/NavBar';
import './AppointmentSchedule.scss'

const AppointmentSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('Appointments') 
        .select('id, patient_id, patient_name, doctor_id, date_time,doctor_name,doctor_specialization,doctor_image,doctor_designation')  
        .order('date_time', { descending: true });  
      console.log(data);

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
        <NavBar/>
    <h1>Appointment Schedule</h1>
    {loading ? (
      <div className="loading">
        <p>Loading appointments...</p>
        <img
          src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e479be0lrxrenydhqbicxcxjax3r27oecws4y4i8x6u&ep=v1_gifs&rid=giphy.gif&ct=g"
          alt="Loading..."
        />
      </div>
    ) : error ? (
      <p className="error-message">Error: {error}</p>
    ) : appointments.length === 0 ? (
      <p className="no-appointments">No appointments found.</p>
    ) : (
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <img src={appointment.doctor_image} alt="" />

            <p style={{ color: "green", fontWeight:"bold" }} ><strong>Doctor name: </strong> {appointment.doctor_name} </p>
            {/* <p><strong>Degree:</strong> {appointment.doctor_specialization} </p> */}
            <p><strong>Designation:</strong> {appointment.doctor_designation} </p>
            <p><strong>patient name:</strong> {appointment.patient_name} </p>
            
            <p><strong>Patient ID:</strong> {appointment.patient_id}</p>
            <p><strong>Doctor ID:</strong> {appointment.doctor_id}</p>
            <p style={{ color: "red", fontWeight:"bold" }}><strong>Date & Time:</strong> {appointment.date_time}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default AppointmentSchedule;
