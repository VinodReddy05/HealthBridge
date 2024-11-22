


import React, { useState, useEffect } from "react";
import SideBar from "../SiderBar/SideBar";
import NavBar from "../../../../../Components/NavBar/NavBar";
import "./PatientsData.scss";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../../../utilies/SupaBase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PatientsData = () => {
  const navigate = useNavigate();

  const [fetchError, setFetchError] = useState(null);
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchJoiningDate, setSearchJoiningDate] = useState("");

  const patientsPerPage = 5;

  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("patientsdata").select("*");

    setLoading(false);

    if (error) {
      setFetchError("Could not fetch data");
      console.error("Error fetching patients:", error);
    } else {
      let filteredPatients = data;

      if (searchTerm) {
        filteredPatients = filteredPatients.filter((patient) =>
          patient.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (searchJoiningDate) {
        filteredPatients = filteredPatients.filter(
          (patient) => patient.joining_date === searchJoiningDate
        );
      }

      if (orderBy === "Status") {
        filteredPatients.sort((a, b) =>
          ["emergency", "normal"].indexOf(a.Status.toLowerCase()) -
          ["emergency", "normal"].indexOf(b.Status.toLowerCase())
        );
      } else if (orderBy === "created_at") {
        filteredPatients.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else {
        filteredPatients.sort((a, b) =>
          a[orderBy]?.localeCompare(b[orderBy])
        );
      }

      setPatients(filteredPatients);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [orderBy, searchTerm, searchJoiningDate]);

  const totalPatients = patients.length;
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "emergency":
        return "status-emergency";
      case "normal":
        return "status-normal";
      default:
        return "";
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const { error } = await supabase
        .from("patientsdata")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting patient:", error);
      } else {
        fetchPatients();
      }
    }
  };

  const handleAddPatient = () => {
    navigate("/patients/new");
  };

  return (
    <div className="patientsData">
      <SideBar />
      <div className="patientContainer">
        <NavBar />
        <div className="datatable">
          <div className="actions">
            <button className="addpatientbtn" onClick={handleAddPatient}>
              Add a Patient
            </button>
            <div className="inputfields">
               <div className="inputfield">
              <input
                className="inputsearch"
                type="date"
                placeholder="Search by Joining Date"
                value={searchJoiningDate}
                onChange={(e) => setSearchJoiningDate(e.target.value)} 
              />
            </div>

            <div className="inputfield">
              <input
                className="inputsearch"
                type="text"
                placeholder="Search by Doctor Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
            <div className="sort-options">
              <button className="created_attbtn" onClick={() => setOrderBy("created_at")}>Order by Created At</button>
              <button className="doctor_namebtn" onClick={() => setOrderBy("doctor_name")}>Order by Doctor Name</button>
            </div>
          </div>

          {fetchError && <p className="error">{fetchError}</p>}

          {loading && <p>Loading patients...</p>}

          {!fetchError && !loading && patients.length > 0 ? (
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Disease</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Specialization</th>
                  <th>Consultation No.</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.doctor_name}</td>
                    <td>{patient.name}</td>
                    <td>{patient.Gender}</td>
                    <td>{patient.disease}</td>
                    <td>{patient.joining_date}</td>
                    <td className={getStatusClass(patient.Status)}>{patient.Status}</td>
                    <td>{patient.specialization}</td>
                    <td>{patient.consultation_number}</td>
                    <td>
                      <Link to={`/patients/edit/${patient.id}`}>
                        <EditIcon />
                      </Link>
                      <DeleteIcon onClick={() => handleDelete(patient.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && <p>No patients found.</p>
          )}

<div className="pagination">
            <button onClick={() => paginate(currentPage - 1)}>Prev</button>

            {Array.from({ length: 1 }, (_, i) => (
              <div key={i}>
                <button
                  className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => paginate(i + 1)}
                >
                  {currentPage}
                </button>
              </div>
            ))}

            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsData;
