// import React, { useState, useEffect } from 'react';
// import { supabase } from '../../../../../utilies/SupaBase';
// import NavBar from '../../../../../Components/NavBar/NavBar';
// import './AppointmentSchedule.scss';

// const AppointmentSchedule = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);

//       // Retrieve patient details from localStorage
//       const patientData = localStorage.getItem('patientData'); // Assuming patient data is stored as JSON
//       if (!patientData) {
//         throw new Error('Patient information is not found. Please log in.');
//       }

//       const patient = JSON.parse(patientData);
//       const patientId = patient.id; // Assuming `id` is the key for patient ID

//       // Fetch appointments for the logged-in patient
//       const { data, error } = await supabase
//         .from('Appointments')
//         .select(
//           'id, patient_id, patient_name, doctor_id, date_time, doctor_name, doctor_specialization, doctor_image, doctor_designation'
//         )
//         .eq('patient_id', patientId) // Filter by patient ID
//         .order('date_time', { descending: true });

//       if (error) {
//         throw error;
//       }

//       setAppointments(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="appointment-schedule">
//       <NavBar />
//       <h1>My Appointment Schedule</h1>
//       {loading ? (
//         <div className="loading">
//           <p>Loading appointments...</p>
//           <img
//             src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e479be0lrxrenydhqbicxcxjax3r27oecws4y4i8x6u&ep=v1_gifs&rid=giphy.gif&ct=g"
//             alt="Loading..."
//           />
//         </div>
//       ) : appointments.length === 0 ? (
//         <p className="no-appointments">No appointments found.</p>
//       ) : (
//         <ul>
//           {appointments.map((appointment) => (
//             <li key={appointment.id}>
//               <img src={appointment.doctor_image} alt="" />
//               <p style={{ color: 'green', fontWeight: 'bold' }}>
//                 <strong>Doctor name: </strong> {appointment.doctor_name}
//               </p>
//               <p>
//                 <strong>Designation:</strong> {appointment.doctor_designation}
//               </p>
//               <p>
//                 <strong>Patient name:</strong> {appointment.patient_name}
//               </p>
//               <p>
//                 <strong>Patient ID:</strong> {appointment.patient_id}
//               </p>
//               <p>
//                 <strong>Doctor ID:</strong> {appointment.doctor_id}
//               </p>
//               <p style={{ color: 'red', fontWeight: 'bold' }}>
//                 <strong>Date & Time:</strong> {appointment.date_time}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AppointmentSchedule;




// import React, { useState, useEffect } from 'react';
// import { supabase } from '../../../../../utilies/SupaBase';
// import NavBar from '../../../../../Components/NavBar/NavBar';
// import './AppointmentSchedule.scss';

// const AppointmentSchedule = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
  
//       const patientData = localStorage.getItem('patientData');
//       console.log("Retrieved patient data:", patientData.id);
//       if (!patientData) {
//         throw new Error('Patient information is not found. Please log in.');
//       }
  
//       const patient = JSON.parse(patientData);
//       const patientId = patient.id;
//       console.log("Patient ID:", patientId);
  
//       const { data, error } = await supabase
//         .from('Appointments')
//         .select(`
//           id,
//           patient_id,
//           patient_name,
//           doctor_id,
//           date_time,
//           doctor_name,
//           doctor_specialization,
//           doctor_image,
//           doctor_designation,
//           patientsdata!inner(visited)
//         `)
//         .eq('patientsdata.id', patientId)
//         .eq('patientsdata.visited', false)
//         .order('date_time', { ascending: true });
  
//       console.log("Fetched appointments:", data);
//       if (error) {
//         console.error("Error fetching appointments:", error);
//         throw error;
//       }
  
//       setAppointments(data);
//     } catch (error) {
//       console.error("Fetch error:", error.message);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="appointment-schedule">
//       <NavBar />
//       <h1>My Appointment Schedule</h1>
//       {loading ? (
//         <div className="loading">
//           <p>Loading appointments...</p>
//           <img
//             src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e479be0lrxrenydhqbicxcxjax3r27oecws4y4i8x6u&ep=v1_gifs&rid=giphy.gif&ct=g"
//             alt="Loading..."
//           />
//         </div>
//       ) : appointments.length === 0 ? (
//         <p className="no-appointments">No appointments found.</p>
//       ) : (
//         <ul>
//           {appointments.map((appointment) => (
//             <li key={appointment.id}>
//               <img src={appointment.doctor_image} alt="" />
//               <p style={{ color: 'green', fontWeight: 'bold' }}>
//                 <strong>Doctor name: </strong> {appointment.doctor_name}
//               </p>
//               <p>
//                 <strong>Designation:</strong> {appointment.doctor_designation}
//               </p>
//               <p>
//                 <strong>Patient name:</strong> {appointment.patient_name}
//               </p>
//               <p>
//                 <strong>Patient ID:</strong> {appointment.patient_id}
//               </p>
//               <p>
//                 <strong>Doctor ID:</strong> {appointment.doctor_id}
//               </p>
//               <p style={{ color: 'red', fontWeight: 'bold' }}>
//                 <strong>Date & Time:</strong> {appointment.date_time}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AppointmentSchedule;




import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../../utilies/SupaBase';
import NavBar from '../../../../../Components/NavBar/NavBar';
import './AppointmentSchedule.scss';

const AppointmentSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to save patient data to localStorage (For testing purposes)
  const fetchAppointments = async () => {
    try {
      setLoading(true); // Show loading indicator
      setError(null); // Clear previous errors
  
      // Retrieve patient data from localStorage
      const patientDataString = localStorage.getItem('patientData');
      if (!patientDataString) {
        throw new Error('Patient information is not found. Please log in.');
      }
  
      const patientData = JSON.parse(patientDataString);
      if (!patientData.id) {
        throw new Error('Invalid patient data. Missing patient ID.');
      }
  
      console.log("Patient ID:", patientData.id);
  
      // Fetch appointments where patient_id matches
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
        .order('date_time', { ascending: true }); // Sort by date
  
      if (error) {
        throw error; // Throw if query fails
      }
  
      console.log("Fetched Appointments:", data);
      setAppointments(data); // Update state with fetched appointments
    } catch (error) {
      console.error("Fetch error:", error.message);
      setError(error.message); // Display error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  
  

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="appointment-schedule">
      <NavBar />
      <h1>My Appointment Schedule</h1>
      {loading ? (
        <div className="loading">
          <p>Loading appointments...</p>
        </div>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : appointments.length === 0 ? (
        <p className="no-appointments">No appointments found for this patient.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <img src={appointment.doctor_image} alt="" />
              <p><strong>Doctor Name:</strong> {appointment.doctor_name}</p>
              <p><strong>Specialization:</strong> {appointment.doctor_specialization}</p>
              <p><strong>Date & Time:</strong> {appointment.date_time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default AppointmentSchedule;
