// import React from "react";
// import NavBar from "../../../../../Components/NavBar/NavBar";
// import PatientSidebar from "../PatientSidebar/PatientSidebar";
// import "./PatientDashboard.scss";
// import { useParams } from "react-router-dom";
// import Widget from "./widgets/Widget";

// const PatientDashboard = () => {
//   const { id } = useParams();

//   return (
//     <div className="patient-dashboard-containers">
//       <NavBar />
//      <div className="main-container">
//      <div className="main-sidebar">
//         <PatientSidebar id={id} />
//         </div>
//         <div className="patient-dashboard-content">
//           <Widget />
//         </div>
//      </div>
//     </div>
//   );
// };

// export default PatientDashboard;

import React, { useEffect, useState } from "react";
import NavBar from "../../../../../Components/NavBar/NavBar";
import PatientSidebar from "../PatientSidebar/PatientSidebar";
import "./PatientDashboard.scss";
import { useParams } from "react-router-dom";
import Widget from "./widgets/Widget";
import { supabase } from "../../../../../utilies/SupaBase";

const PatientDashboard = () => {
  const params = useParams();
  // console.log('useParams:', params);  // Log the entire params object
  const [patientData, setPatientData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [error, setError] = useState(null);
  const currentPatients = JSON.parse(localStorage.getItem("patientData")); // Get the patient data from localStorage
  const patientId = currentPatients?.id || params.id;

  useEffect(() => {
    if (!patientId) {
      console.error("Patient ID is missing!");
      setError("Patient ID is missing");
      return;
    }

    const fetchPatientData = async () => {
      const { data, error } = await supabase
        .from("patientsdata")
        .select("*")
        .eq("id", Number(patientId))
        .single();

      if (data) {
        setPatientData(data);
        console.log("Patient Data:", data);
        fetchDoctorBySpecialization(data.specialization);
      } else {
        console.error(error);
        setError("Error fetching patient data");
      }
    };

    const fetchDoctorBySpecialization = async (specialization,Designation) => {
      console.log("Fetching doctors for Designation:", specialization);
      const { data, error } = await supabase
        .from("DoctorsData")
        .select()
        
        .eq("Designation", specialization);
        console.log('Specialization being queried:', specialization);
      if (data) {
        console.log('Setting doctorData:', data);
        setDoctorData(data);
      } else {
        console.error(error);
        setError("Error fetching doctor data");
      }
    };

    fetchPatientData();
  }, [patientId]);

  return (
    <div className="patient-dashboard-containers">
      <NavBar />
      <div className="main-container">
        <div className="main-sidebar">
          <PatientSidebar patientId={patientId} />
        </div>
        <div className="patient-dashboard-content">
          <Widget />
          {error && <div style={{ color: "red" }}>{error}</div>}
          {patientData && doctorData && (
            <div className="doctor-details">
              <h3>Recommended Doctor(s)</h3>
             <div className="doctors-card2">
             {doctorData && doctorData.length > 0 ? (
                doctorData.map((doctor) => (
                  <div key={doctor.id} className="doctor-card">
                    <img src={doctor.image_url} alt="" />
                    <h4><strong>{doctor.name}</strong></h4>
                    <p><strong className="disg">{doctor.Designation}</strong></p>
                    <p>{doctor.info}</p>
                    <button>Get Appointment</button>
                  </div>
                ))
              ) : (
                <p>No doctors found for the given specialization.</p>
              )}
             </div>
            </div>
          )}
        </div>
      </div>
      <h1>vinod</h1>
    </div>
  );
};

export default PatientDashboard;
