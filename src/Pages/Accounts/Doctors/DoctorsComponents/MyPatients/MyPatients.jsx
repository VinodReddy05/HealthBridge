import React, { useEffect, useState } from "react";
import "./MyPatients.scss";
import { supabase } from "../../../../../utilies/SupaBase";
import NavBar from "../../../../../Components/NavBar/NavBar";
import DoctorsSidebar from "../../../Doctors/DoctorsComponents/DoctorsSidebar/DoctorsSidebar";

const MyPatients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  
    }, 2000);  

    return () => clearTimeout(timer);  
  }, []);

  const currentDoctor = JSON.parse(localStorage.getItem("doctorData"));
  const doctorSpecialization = currentDoctor?.Designation?.trim();

  useEffect(() => {
    if (!doctorSpecialization) {
      setProfileImage(null);  // Clear profile image if designation is missing
      setError("Doctor data is missing. Please login again.");
      return;
    }

    const fetchPatients = async () => {
      // Fetch all patients from the "patientsdata" table
      const { data, error } = await supabase
        .from("patientsdata")
        .select("*")
        .eq("visited", true);  // Filter by visited true

      if (error) {
        setError("Error fetching patient data.");
      } else {
        // Filter patients based on the doctor's designation (if needed)
        const filteredPatients = data.filter(
          (patient) => patient.specialization === doctorSpecialization
        );
        setPatientsData(filteredPatients);
      }
    };

    fetchPatients();
  }, [doctorSpecialization]);

  return (
    <div className="my-patients">
      <NavBar profileImage={profileImage} />
      <h1>My Patients</h1>
      {loading ? (
        <div className="loading">
          <p>Loading patients...</p>
          <img 
            src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e47l2mubft6j3ziu9t1qbgvfkfngodcfrx0efthlwlz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Loading..."
          />
        </div>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : patientsData.length === 0 ? (
        <p className="no-appointments">No patients found who have visited.</p>
      ) : (
        <div className="patients-list">
          {patientsData.map((patient) => (
            <div key={patient.id} className="patient-cards">
             <div className="patient-head"> 
              <h2>{patient.name}</h2>
             <p><strong>OP:</strong> {patient.joining_date}</p>
             </div>
            <p><strong>Patient Id:</strong> {patient.id}</p>
            <div className="blood-group">
              <p><strong>Gender:</strong> {patient.Gender}</p>
            <p><strong>Blood Group:</strong> {patient.Blood_Group}</p>
            </div>
              <p><strong>prescription:</strong> {patient.prescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPatients;
