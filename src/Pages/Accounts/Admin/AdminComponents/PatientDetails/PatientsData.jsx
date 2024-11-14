import React, { useState, useEffect } from 'react';
import SideBar from '../SiderBar/SideBar';
import NavBar from "../../../../../Components/NavBar/NavBar";
import "./PatientsData.scss";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from "../../../../../utilies/SupaBase";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PatientsData = () => {

    const navigate = useNavigate()

    const [fetchError, setFetchError] = useState(null);
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState('created_at');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const patientsPerPage = 5;
    const customSort = (a, b) => {
        const order = ['recovered', 'pending', 'rejected'];
        return order.indexOf(a.Status.toLowerCase()) - order.indexOf(b.Status.toLowerCase());
    };

    const fetchPatients = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('patientsdata')
            .select();
        setLoading(false);

        if (error) {
            setFetchError("Could not fetch data");
        } else {
            let filteredPatients = data;

            if (searchTerm) {
                filteredPatients = data.filter(patient =>
                    patient.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (orderBy === 'Status') {
                filteredPatients.sort(customSort);
            } else if (orderBy === 'created_at') {
                filteredPatients.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else {
                filteredPatients.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
            }

            setPatients(filteredPatients);
            setFetchError(null);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [orderBy, searchTerm]);

    const totalPatients = patients.length;
    // const totalPages = Math.ceil(totalPatients / patientsPerPage);
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    const paginate = (pageNumber, totalPages) => { 
        if (pageNumber < 1 || pageNumber > totalPages) {
            alert('Invalid page number. Please select a number between 1 and ' + totalPages);
            return; 
        }
            setCurrentPage(pageNumber);
    };

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
            fetchPatients();
        }
    };


    const handleAddPatient = () => {
        navigate("/patients/new")
    }

    return (
        <div className='patientsData'>
            <SideBar />
            <div className="patientContainer">
                <NavBar />
                <div className="datatable">
                    <button className='addpatientbtn ' onClick={handleAddPatient}>
                        Add a Patient
                    </button>
                    <div className='createdbtn'>
                        <div className="buttonstatus">
                            <button className='created_attbtn' onClick={() => setOrderBy('created_at')}>Order by Created At</button>
                            <button className='doctor_namebtn' onClick={() => setOrderBy('doctor_name')}>Order by Doctor Name</button>
                        </div>
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



                    {fetchError && <p className='error'>{fetchError}</p>}

                    {!fetchError && !loading && patients.length > 0 && (
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
                                        <td>
                                            <Link to={`/patients/${patient.id}`}>
                                                {patient.patient_name}
                                            </Link>
                                        </td>
                                        <td>{patient.Gender}</td>
                                        <td>{patient.disease}</td>
                                        <td>{patient.joining_date}</td>
                                        <td className={getStatusClass(patient.Status)}>{patient.Status}</td>
                                        <td>{patient.referring_doctor}</td>
                                        <td>{patient.consultation_number}</td>
                                        <td className='icon'>
                                            <Link to={`/patients/edit/${patient.id}`}><EditIcon /></Link>
                                        </td>
                                        <td className='icon' onClick={() => handleDelete(patient.id)}><DeleteIcon /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {loading && <p>Loading patients data...</p>}

                    <div className="pagination">



                        <button
                            onClick={() => paginate(currentPage - 1)}
                        >
                            Prev
                        </button>


                        {Array.from({ length: 1 }, (_, i) => (
                            <div   key={i} >

                                <button
                                  
                                    className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {currentPage }
                                </button>


                            </div>



                        ))}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                        >
                            next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientsData;
