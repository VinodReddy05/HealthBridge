import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from "../../Components/NavBar/NavBar";
import "./PatientsData.scss";
import supabase from '../../utilies/SupaBase';

const PatientsData = () => {
    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [ageGender, setAgeGender] = useState('');
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
    const patientsPerPage = 5;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
    
        if (!doctorName || !patientName || !ageGender || !disease || !joiningDate || !refDoctor || !consultNo || !status) {
            setFormError("Please fill out all fields correctly.");
            return;
        }
    
        try {
            const { data, error } = await supabase
                .from('patientsdata')
                .insert([{
                    doctor_name: doctorName.trim(),
                    patient_name: patientName.trim(),
                    age_and_gender: ageGender.trim(),
                    disease: disease.trim(),
                    joining_date: joiningDate,
                    referring_doctor: refDoctor.trim(),
                    consultation_number: consultNo.trim(),
                    Status: status.trim(),
                    
                }]);
                console.log(data);
    
            if (error) {
                setFormError(`Submission error: ${error.message}`);
            } else if (data) {
                setPatients(prevPatients => [...prevPatients, ...data]); // Only spread if data exists
                setFormError(null);
                // Reset form fields
                setDoctorName('');
                setPatientName('');
                setAgeGender('');
                setDisease('');
                setJoiningDate('');
                setRefDoctor('');
                setConsultNo('');
                setStatus('');
                setShowForm(false);
            }
        } catch (error) {
            setFormError("Unexpected error occurred. Please try again.");
        }
    };

    const fetchPatients = async () => {
        const { data, error } = await supabase
            .from('patientsdata')
            .select();

        if (error) {
            setFetchError("Could not fetch data");
        } else {
            setPatients(data);
            setFetchError(null);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const totalPatients = patients.length;
    const totalPages = Math.ceil(totalPatients / patientsPerPage);
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // color for pending recovered rejected
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'recovered':
                return 'status-recovered';
            case 'rejected':
                return 'status-rejected';
            default:
                return ''; // Default class if status doesn't match
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

                    {showForm && (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="DoctorName">Doctor Name</label>
                            <input type="text" id="DoctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />

                            <label htmlFor="PatientName">Patient Name</label>
                            <input type="text" id="PatientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} />

                            <label htmlFor="AgeGender">Age/Gender</label>
                            <input type="text" id="AgeGender" value={ageGender} onChange={(e) => setAgeGender(e.target.value)} />

                            <label htmlFor="Disease">Disease</label>
                            <input type="text" id="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} />

                            <label htmlFor="JoiningDate">Joining Date</label>
                            <input type="date" id="JoiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />

                            <label htmlFor="RefDoctor">Referring Doctor</label>
                            <input type="text" id="RefDoctor" value={refDoctor} onChange={(e) => setRefDoctor(e.target.value)} />

                            <label htmlFor="ConsultNo">Consultation No.</label>
                            <input type="text" id="ConsultNo" value={consultNo} onChange={(e) => setConsultNo(e.target.value)} />

                            <label htmlFor="status">status</label>
                            <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />

                            <button type="submit">Submit</button>
                            {formError && <p className='error'>{formError}</p>}
                        </form>
                    )}

                    {fetchError && <p className='error'>{fetchError}</p>}

                    {!fetchError && patients.length > 0 && (
                        <table className="patient-table">
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Patient Name</th>
                                    <th>Age/Gender</th>
                                    <th>Disease</th>
                                    <th>Joining Date</th>
                                    <th>status</th>
                                    <th>Referring Doctor</th>
                                    <th>Consultation No.</th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentPatients.map((patient, index) => (
                                    <tr key={index}>
                                        <td>{patient.doctor_name}</td>
                                        <td>{patient.patient_name}</td>
                                        <td>{patient.age_and_gender}</td>
                                        <td>{patient.disease}</td>
                                        <td>{patient.joining_date}</td>
                                        <td className={getStatusClass(patient.Status)}>{patient.Status}</td>
                                        <td>{patient.referring_doctor}</td>
                                        <td>{patient.consultation_number}</td>
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
