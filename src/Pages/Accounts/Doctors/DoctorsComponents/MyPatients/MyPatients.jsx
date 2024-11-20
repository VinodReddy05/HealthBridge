import React, { useEffect, useState } from "react";
import "./MyPatients.scss";
import { supabase } from "../../../../../utilies/SupaBase";
import NavBar from '../../../../../Components/NavBar/NavBar'

import DoctorsSidebar from "../../../Doctors/DoctorsComponents/DoctorsSidebar/DoctorsSidebar";

const MyPatients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading or watch for actual data loading condition
    const timer = setTimeout(() => {
      setLoading(false); // Data loading is complete
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Retrieve doctor data from localStorage
  const currentDoctor = JSON.parse(localStorage.getItem("doctorData"));
  const doctorSpecialization = currentDoctor?.Designation?.trim();
  // console.log("Doctor Data from localStorage:", currentDoctor);

  useEffect(() => {
    if (!doctorSpecialization) {
      // console.error("Doctor specialization is missing!");
      setError("Doctor data is missing. Please login again.");
      return;
    }

    const fetchPatientsBySpecialization = async () => {
      // console.log("Fetching patients for specialization:", doctorSpecialization);

      const { data, error } = await supabase
        .from("patientsdata")
        .select("*")
        .eq("specialization", doctorSpecialization); // Use the correct column name here

      if (data) {
        // console.log("Fetched patient data:", data);
        setPatientsData(data);
      } else {
        // console.error("Error fetching patient data:", error);
        setError("Error fetching patient data.");
      }
    };

    fetchPatientsBySpecialization();
  }, [doctorSpecialization]);

  return (
<div className="vinod">
<div className="doctors-Patients">
<div className="heading"><h1>My Patients</h1></div>

<div>
  <div className="sidebar">
 <DoctorsSidebar/>
</div>
<div className="content">
  <div className="navbar">
    <NavBar />
  </div>
  <div className="my-patients-container">
   
    {error && <div style={{ color: "red" }}>{error}</div>}
    <div className="patients-list">
    {loading ? (
          // Show the GIF while loading
          <img
            src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e47l2mubft6j3ziu9t1qbgvfkfngodcfrx0efthlwlz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Loading..."
            style={{
              display: "block",
              margin: "20px auto",
              width: "100%",
              maxWidth: "200px",
            }}
          />
        ) : patientsData && patientsData.length > 0 ? (
    patientsData.map((patient) => (
      <div key={patient.id} className="patient-card">
        <h2>{patient.name}</h2>
        <p><strong>OP:</strong> {patient.joining_date}</p>
        <p><strong>Specialization:</strong> {patient.specialization}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: patient.Status === "Emergency" ? "red" : "green",
            }}
          >
            {patient.Status}
          </span>
        </p>
        <p><strong>Gender:</strong> {patient.Gender}</p>
      </div>
    ))
  ) : (
    <p>Patient Details not found</p>
  )}
</div>
  </div>
</div>
</div>
</div>
</div>
   
  );
};

export default MyPatients;



       