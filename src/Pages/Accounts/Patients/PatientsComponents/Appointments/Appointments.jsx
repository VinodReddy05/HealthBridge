import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../utilies/SupaBase";
import "./Appointments.scss";
import NavBar from "../../../../../Components/NavBar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointments = () => {
  const [fetchError, setFetchError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem("patientData"));
    if (patientData && patientData.name) {
      setPatientName(patientData.name);
    }
  }, []);

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from("DoctorsData").select();
    if (error) {
      setFetchError("Could not fetch data");
      setDoctors([]);
    } else {
      setDoctors(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleGetAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedDoctor(null);
    setAppointmentDate("");
  };

  const handleAppointmentSubmit = async () => {
    if (!appointmentDate) {
      toast.error("Please select a date and time for the appointment.");
      return;
    }

    const patientData = JSON.parse(localStorage.getItem("patientData"));
    console.log("Retrieved patient_data:", patientData);

    if (!patientData || !patientData.id || isNaN(patientData.id)) {
      toast.error("Patient ID is not available or invalid.");
      return;
    }

    const patientId = patientData.id;

    if (!selectedDoctor) {
      toast.error("No doctor selected.");
      return;
    }

    try {
      // Insert appointment into Appointments table
      const { data: appointmentData, error: appointmentError } = await supabase
        .from("Appointments")
        .insert([
          {
            patient_id: patientId,
            doctor_id: selectedDoctor.id,
            date_time: appointmentDate,
            doctor_name: selectedDoctor.name, // Store doctor's name
            doctor_image: selectedDoctor.image_url, // Store doctor's image
            doctor_specialization: selectedDoctor.Degree, // Store doctor's specialization
            doctor_designation: selectedDoctor.Designation,
            patient_name: patientName,
          },
        ])
        .select();

      if (appointmentError) {
        console.error(appointmentError);
        toast.error("Error scheduling appointment. Please try again.");
        return;
      }

      const { error: doctorUpdateError } = await supabase
        .from("DoctorsData")
        .update({
          appointments: appointmentData, // Add appointment data to doctor
        })
        .eq("id", selectedDoctor.id);

      if (doctorUpdateError) {
        console.error(doctorUpdateError);
        toast.warning(
          "Appointment scheduled, but doctor details were not updated."
        );
      }

      const { error: patientUpdateError } = await supabase
        .from("patientsdata")
        .update({
          appointments: appointmentData, // Add appointment data to patient
        })
        .eq("id", patientId);

      if (patientUpdateError) {
        console.error(patientUpdateError);
        toast.warning(
          "Appointment scheduled, but patient details were not updated."
        );
      }

      toast.success("Appointment scheduled successfully!");
      handleClosePopup();
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="toggle">
      <NavBar />
      {fetchError && <p>{fetchError}</p>}
      {doctors && (
        <div className="doctors-card">
          {doctors.map((doctor, index) => (
            <div key={index} className="doctor-info-card">
              <img src={doctor.image_url} alt={doctor.name} />
              <p>
                <strong>{doctor.name}</strong>
              </p>
              <p style={{ color: "red" }}>
                <b>{doctor.Designation}</b>
              </p>
              <p>
                <b>{doctor.Degree}</b>
              </p>
              <p>{doctor.info}</p>
              <button
                className="appointmentbtn"
                onClick={() => handleGetAppointment(doctor)}
              >
                Get Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="appointment-popup">
          <div className="popup-content">
            <h3>Schedule an Appointment</h3>
            <img
              src={selectedDoctor?.image_url}
              alt={selectedDoctor?.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p>
              <strong>Doctor:</strong> {selectedDoctor?.name}
            </p>
            <p>
              <strong>Specialization:</strong> {selectedDoctor?.Degree}
            </p>
            <p>
              <strong>Designation:</strong> {selectedDoctor?.Designation}
            </p>

            <p>
              <strong>Patient Name:</strong> {patientName}
            </p>

            <label>
              <strong>Date and Time:</strong>
              <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </label>
            <div className="popup-actions">
              <button onClick={handleAppointmentSubmit}>Confirm</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Appointments;
