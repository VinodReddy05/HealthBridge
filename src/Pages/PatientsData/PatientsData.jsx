// import React, { useState, useEffect } from 'react';
// import SideBar from '../../Components/SideBar/SideBar';
// import NavBar from "../../Components/NavBar/NavBar";
// import "./PatientsData.scss";
// import { Link } from 'react-router-dom';
// import { supabase } from "../../utilies/SupaBase";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const PatientsData = () => {
//     const [doctorName, setDoctorName] = useState('');
//     const [patientName, setPatientName] = useState('');
//     const [gender, setGender] = useState('');
//     const [disease, setDisease] = useState('');
//     const [joiningDate, setJoiningDate] = useState('');
//     const [refDoctor, setRefDoctor] = useState('');
//     const [consultNo, setConsultNo] = useState('');
//     const [status, setStatus] = useState('');
//     const [formError, setFormError] = useState('');

//     const [showForm, setShowForm] = useState(false);
//     const [fetchError, setFetchError] = useState(null);
//     const [patients, setPatients] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [orderBy, setOrderBy] = useState('created_at');  // Default ordering by created_at
//     const patientsPerPage = 5;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormError('');  // Reset any previous errors
    
//         // Check if all fields are filled out
//         if (!doctorName || !patientName || !gender || !disease || !joiningDate || !refDoctor || !consultNo || !status) {
//             setFormError("Please fill out all fields correctly.");
//             return;
//         }
    
//         try {
//             const { data, error } = await supabase
//                 .from('patientsdata')
//                 .insert([{
//                     doctor_name: doctorName.trim(),
//                     patient_name: patientName.trim(),
//                     Gender: gender.trim(),
//                     disease: disease.trim(),
//                     joining_date: joiningDate,
//                     referring_doctor: refDoctor.trim(),
//                     consultation_number: consultNo.trim(),
//                     Status: status.trim(),
//                 }]);
    
//             if (error) {
//                 setFormError(`Submission error: ${error.message}`);
//             } else if (data) {
//                 setPatients(prevPatients => [...prevPatients, data[0]]);
    
//                 fetchPatients(); 
    
//                 setDoctorName('');
//                 setPatientName('');
//                 setGender('');
//                 setDisease('');
//                 setJoiningDate('');
//                 setRefDoctor('');
//                 setConsultNo('');
//                 setStatus('');
//                 setShowForm(false);
    
//                 setCurrentPage(1);
//             }
//         } catch (error) {
//             setFormError("Unexpected error occurred. Please try again.");
//         }
//     };
    

//     const fetchPatients = async () => {
//         const { data, error } = await supabase
//             .from('patientsdata')
//             .select()
//             .order(orderBy, { ascending: false });  // Order patients by `orderBy` field
    
//         if (error) {
//             setFetchError("Could not fetch data");
//         } else {
//             setPatients(data);
//             setFetchError(null);
//         }
//     };
    

//     useEffect(() => {
//         fetchPatients();
//     }, [orderBy]);  // Fetch data again when `orderBy` state changes

//     const totalPatients = patients.length;
//     const totalPages = Math.ceil(totalPatients / patientsPerPage);
//     const indexOfLastPatient = currentPage * patientsPerPage;
//     const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
//     const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const getStatusClass = (status) => {
//         switch (status.toLowerCase()) {
//             case 'pending':
//                 return 'status-pending';
//             case 'recovered':
//                 return 'status-recovered';
//             case 'rejected':
//                 return 'status-rejected';
//             default:
//                 return ''; 
//         }
//     };
      
//     // Delete row 
//     const handleDelete = async (id) => {
//         // Show a confirmation dialog with OK and Cancel buttons
//         const isConfirmed = window.confirm("Are you sure you want to delete this file?");

//         if (isConfirmed) {
//             // Proceed with the deletion if OK is clicked
//             const { data, error } = await supabase
//                 .from('patientsdata')
//                 .delete()
//                 .eq('id', Number(id))
//                 .select();

//             if (error) {
//                 console.log(error);
//             }
//             if (data) {
//                 console.log(data);
//             }

//             // Optionally, fetch patients again or update state after deletion
//             fetchPatients();  // Re-fetch the patient data after deletion
//         } else {
//             // If Cancel is clicked, do nothing or log the cancel action
//             console.log('Deletion was canceled.');
//         }
//     };

//     return (
//         <div className='patientsData'>
//             <SideBar />
//             <div className="patientContainer">
//                 <NavBar />
//                 <div className="datatable">
//                     <button onClick={() => setShowForm(!showForm)}>
//                         {showForm ? 'Hide Form' : 'Add a Patient'}
//                     </button>

//                     {/* Order by buttons */}
//                     <div>
//                         <button onClick={() => setOrderBy('created_at')}>Order by Created At</button>
//                         <button onClick={() => setOrderBy('doctor_name')}>Order by Doctor Name</button>
//                         <button onClick={() => setOrderBy('Status')}>Order by Status</button>
//                     </div>

//                     {showForm && (
//                         <form onSubmit={handleSubmit}>
//                             <label htmlFor="DoctorName">Doctor Name</label>
//                             <input type="text" id="DoctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />

//                             <label htmlFor="PatientName">Patient Name</label>
//                             <input type="text" id="PatientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} />

//                             <label htmlFor="gender">Gender</label>
//                             <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />

//                             <label htmlFor="Disease">Disease</label>
//                             <input type="text" id="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} />

//                             <label htmlFor="JoiningDate">Joining Date</label>
//                             <input type="date" id="JoiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />

//                             <label htmlFor="RefDoctor">Referring Doctor</label>
//                             <input type="text" id="RefDoctor" value={refDoctor} onChange={(e) => setRefDoctor(e.target.value)} />

//                             <label htmlFor="ConsultNo">Consultation No.</label>
//                             <input type="text" id="ConsultNo" value={consultNo} onChange={(e) => setConsultNo(e.target.value)} />

//                             <label htmlFor="status">status</label>
//                             <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />

//                             <button type="submit">Submit</button>
//                             {formError && <p className='error'>{formError}</p>}
//                         </form>
//                     )}

//                     {fetchError && <p className='error'>{fetchError}</p>}

//                     {!fetchError && patients.length > 0 && (
//                         <table className="patient-table">
//                             <thead>
//                                 <tr>
//                                     <th>Doctor Name</th>
//                                     <th>Patient Name</th>
//                                     <th>Gender</th>
//                                     <th>Disease</th>
//                                     <th>Joining Date</th>
//                                     <th>status</th>
//                                     <th>Referring Doctor</th>
//                                     <th>Consultation No.</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentPatients.map((patient, index) => (
//                                     <tr key={index}>
//                                         <td>{patient.doctor_name}</td>
//                                         <td>{patient.patient_name}</td>
//                                         <td>{patient.Gender}</td>
//                                         <td>{patient.disease}</td>
//                                         <td>{patient.joining_date}</td>
//                                         <td className={getStatusClass(patient.Status)}>{patient.Status}</td>
//                                         <td>{patient.referring_doctor}</td>
//                                         <td>{patient.consultation_number}</td>
//                                         <td className='icon'> 
//                                             <Link to={`/patients/edit/${patient.id}`}><EditIcon /></Link> 
//                                         </td>
//                                         <td className='icon' onClick={() => handleDelete(patient.id)} ><DeleteIcon/></td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}

//                     <div className="pagination">
//                         {[...Array(totalPages).keys()].map((page) => (
//                             <button
//                                 key={page}
//                                 onClick={() => paginate(page + 1)}
//                                 className={currentPage === page + 1 ? "active" : ""}
//                             >
//                                 {page + 1}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PatientsData;




import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from "../../Components/NavBar/NavBar";
import "./PatientsData.scss";
import { Link } from 'react-router-dom';
import { supabase } from "../../utilies/SupaBase";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PatientsData = () => {
    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [disease, setDisease] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [refDoctor, setRefDoctor] = useState('');
    const [consultNo, setConsultNo] = useState('');
    const [status, setStatus] = useState('');
    const [formError, setFormError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState('created_at');  // Default ordering by created_at
    const [searchTerm, setSearchTerm] = useState(''); // New state for search input
    const patientsPerPage = 5;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');  // Reset any previous errors
    
        // Check if all fields are filled out
        if (!doctorName || !patientName || !gender || !disease || !joiningDate || !refDoctor || !consultNo || !status) {
            setFormError("Please fill out all fields correctly.");
            return;
        }
    
        try {
            const { data, error } = await supabase
                .from('patientsdata')
                .insert([{
                    doctor_name: doctorName.trim(),
                    patient_name: patientName.trim(),
                    Gender: gender.trim(),
                    disease: disease.trim(),
                    joining_date: joiningDate,
                    referring_doctor: refDoctor.trim(),
                    consultation_number: consultNo.trim(),
                    Status: status.trim(),
                }]);
    
            if (error) {
                setFormError(`Submission error: ${error.message}`);
            } else if (data) {
                setPatients(prevPatients => [...prevPatients, data[0]]);
    
                fetchPatients(); 
    
                setDoctorName('');
                setPatientName('');
                setGender('');
                setDisease('');
                setJoiningDate('');
                setRefDoctor('');
                setConsultNo('');
                setStatus('');
                setShowForm(false);
    
                setCurrentPage(1);
            }
        } catch (error) {
            setFormError("Unexpected error occurred. Please try again.");
        }
    };

    const customSort = (a, b) => {
        const order = ['recovered', 'pending', 'rejected'];
        return order.indexOf(a.Status.toLowerCase()) - order.indexOf(b.Status.toLowerCase());
    };

    const fetchPatients = async () => {
        const { data, error } = await supabase
            .from('patientsdata')
            .select();

        if (error) {
            setFetchError("Could not fetch data");
        } else {
            let filteredPatients = data;

            // Apply search filter by doctor_name if searchTerm is provided
            if (searchTerm) {
                filteredPatients = data.filter(patient =>
                    patient.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (orderBy === 'Status') {
                const sortedData = filteredPatients.sort(customSort);
                setPatients(sortedData);
            } else {
                const sortedData = filteredPatients.sort((a, b) => {
                    if (orderBy === 'created_at') {
                        return new Date(b.created_at) - new Date(a.created_at);
                    }
                    return a[orderBy].localeCompare(b[orderBy]);
                });
                setPatients(sortedData);
            }

            setFetchError(null);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [orderBy, searchTerm]); // Re-fetch when either orderBy or searchTerm changes

    const totalPatients = patients.length;
    const totalPages = Math.ceil(totalPatients / patientsPerPage);
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'recovered':
                return 'status-recovered';
            case 'rejected':
                return 'status-rejected';
            default:
                return ''; 
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this file?");
        if (isConfirmed) {
            const { data, error } = await supabase
                .from('patientsdata')
                .delete()
                .eq('id', Number(id))
                .select();

            if (error) {
                console.log(error);
            }
            if (data) {
                console.log(data);
            }
            fetchPatients(); 
        } else {
            console.log('Deletion was canceled.');
        }
    };

    return (
        <div className='patientsData'>
            <SideBar />
            <div className="patientContainer">
                <NavBar />
                <div className="datatable">
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Hide Form' : 'Add a Patient'}
                    </button>

                    {/* Order by buttons */}
                    <div className='createdbtn'>
                       <div className="buttonstatus">
                       <button onClick={() => setOrderBy('created_at')}>Order by Created At</button>
                        <button onClick={() => setOrderBy('doctor_name')}>Order by Doctor Name</button>

                       </div>
                        {/* Search input for doctor name */}
                      <div className="inputfield">
                      <input 
                        className='inputsearch'
                            type="text"
                            placeholder="Search by Doctor Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {showForm && (
                        <form onSubmit={handleSubmit}>
                            {/* Form fields here */}
                        </form>
                    )}

                    {fetchError && <p className='error'>{fetchError}</p>}

                    {!fetchError && patients.length > 0 && (
                        <table className="patient-table">
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Patient Name</th>
                                    <th>Gender</th>
                                    <th>Disease</th>
                                    <th>Joining Date</th>
                                    <th>Status</th>
                                    <th>Referring Doctor</th>
                                    <th>Consultation No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPatients.map((patient, index) => (
                                    <tr key={index}>
                                        <td>{patient.doctor_name}</td>
                                        <td>{patient.patient_name}</td>
                                        <td>{patient.Gender}</td>
                                        <td>{patient.disease}</td>
                                        <td>{patient.joining_date}</td>
                                        <td className={getStatusClass(patient.Status)}>{patient.Status}</td>
                                        <td>{patient.referring_doctor}</td>
                                        <td>{patient.consultation_number}</td>
                                        <td className='icon'>
                                            <Link to={`/patients/edit/${patient.id}`}><EditIcon /></Link>
                                        </td>
                                        <td className='icon' onClick={() => handleDelete(patient.id)}><DeleteIcon/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="pagination">
                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page}
                                onClick={() => paginate(page + 1)}
                                className={currentPage === page + 1 ? "active" : ""}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientsData;
