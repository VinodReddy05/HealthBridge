
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../utilies/SupaBase";
import NavBar from "../../../../../Components/NavBar/NavBar";
import "./MyAppointments.scss";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);  
  const [selectedAppointment, setSelectedAppointment] = useState(null);  
  const [prescription, setPrescription] = useState(""); 

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const doctorDetails = JSON.parse(localStorage.getItem("doctorData"));
      if (!doctorDetails) {
        console.log("Doctor Details:", doctorDetails);
        throw new Error("Doctor not logged in");
      }

      const { id: doctorId, Designation } = doctorDetails;
      const { data, error } = await supabase
        .from("Appointments")
        .select("*")
        .or(`doctor_id.eq.${doctorId},doctor_designation.eq.${Designation}`)
        .order("date_time", { descending: true });

      if (error) {
        throw error;
      }
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkVisited = async (appointmentId, patientId) => {
    try {
      const { error: deleteError } = await supabase
        .from("Appointments")
        .delete()
        .eq("id", appointmentId);

      if (deleteError) throw deleteError;

      const { error: updateError } = await supabase
        .from("patientsdata")
        .upsert([{ id: patientId, visited: true }]); 

      if (updateError) throw updateError;

      fetchAppointments();

      alert("Patient marked as visited.");
    } catch (err) {
      alert("Error marking patient as visited: " + err.message);
    }
  };

  const handleSendPrescription = async (e) => {
    e.preventDefault();
    if (!selectedAppointment || !prescription.trim()) {
      alert("Please provide prescription details.");
      return;
    }

    try {
      const { error } = await supabase
        .from("patientsdata") 
        .update({ prescription})  
        .eq("id", selectedAppointment.patient_id);  
        console.log("Updating Patient:", selectedAppointment.patient_id);
        console.log("Prescription:", prescription);
      if (error) throw error;

      alert("Prescription sent successfully!");
      setShowForm(false);  
      setPrescription("");  
    } catch (err) {
      alert("Error sending prescription: " + err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="appointments">
      <NavBar />
      <h1>My Patients</h1>
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
        <p className="no-appointments">No patients found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <div className="date">
                <p style={{ color: "red", fontWeight: "bold" }}>
                  <strong>Date: </strong>{" "}
                  {new Date(appointment.date_time).toLocaleDateString()}
                </p>
                <p style={{ color: "red", fontWeight: "bold" }}>
                  <strong>Time: </strong>{" "}
                  {new Date(appointment.date_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p style={{ color: "green", fontWeight: "bold" }}>
                <strong>Doctor Name: </strong> {appointment.doctor_name}
              </p>
              <p style={{ color: "grey", fontWeight: "bold" }}>
                <strong>Doctor ID: </strong>
                {appointment.doctor_id}
              </p>
              <p style={{ color: "#EB8317", fontWeight: "bold" }}>
                <strong>Patient Name: </strong>
                {appointment.patient_name}
              </p>
              <p style={{ color: "grey", fontWeight: "bold" }}>
                <strong>Patient ID: </strong>
                {appointment.patient_id}
              </p>
             <div className="prescription-btns">
             <button
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setShowForm(true);
                }}
              >
                Send Prescription
              </button>

              {/* Radio Button to Mark as Visited */}
              <label>
                <input
                  type="radio"
                  name={`visited-${appointment.id}`}
                  onChange={() =>
                    handleMarkVisited(appointment.id, appointment.patient_id)
                  }
                />
                Mark as Visited
              </label>
             </div>
            </li>
          ))}
        </ul>
      )}

      {/* Prescription Form Popup */}
      {showForm && (
        <div className="prescription-form">
          <div className="form-container">
            <h2>Send Prescription</h2>
            <form onSubmit={handleSendPrescription}>
              <p>
                <strong>Patient: </strong>
                {selectedAppointment.patient_name}
              </p>
              <textarea
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                placeholder="Write the prescription here..."
              ></textarea>
              <button type="submit">Send</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
