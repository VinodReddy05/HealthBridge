import React from "react";
import NavBar from "../../../../../Components/NavBar/NavBar";
import PatientSidebar from "../PatientSidebar/PatientSidebar";
import "./PatientDashboard.scss";
import { useParams } from "react-router-dom";

const PatientDashboard = () => {
  const { patientId } = useParams();
  return (
    <div>
      <NavBar />
      <PatientSidebar patientId={patientId} />
      <div className="patientdashboard">
        <h1>
          your in patient dashboard 
        </h1>
      </div>
    </div>
  );
};

export default PatientDashboard;
