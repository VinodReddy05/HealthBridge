import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../../../utilies/SupaBase';
import "./PatientEdit.scss";

const PatientEdit = () => {
    const { id } = useParams();  // Get the patient id from the URL
    const navigate = useNavigate();  // To redirect after submission or cancellation

    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [ageGender, setAgeGender] = useState('');
    const [disease, setDisease] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [refDoctor, setRefDoctor] = useState('');
    const [consultNo, setConsultNo] = useState('');
    const [status, setStatus] = useState('');
    const [formError, setFormError] = useState('');

    // Fetch patient data based on the ID
    useEffect(() => {

       

        const fetchPatient = async () => {
            const { data, error } = await supabase
                .from('patientsdata')
                .select('*')
                .eq('id', id)  // Use the ID from the URL to fetch the data
                .single(); // We expect only one result

            if (error) {
                navigate('patients')
                console.log(error.message);
                setFormError("Patient data could not be fetched.");
            } if(data) {
                setDoctorName(data.doctor_name);
                setPatientName(data.patient_name);
                setAgeGender(data.age_and_gender);
                setDisease(data.disease);
                setJoiningDate(data.joining_date);
                setRefDoctor(data.referring_doctor);
                setConsultNo(data.consultation_number);
                setStatus(data.Status);
            }
        };

        fetchPatient();
    }, [id]);  // Run the effect when the component mounts or when the ID changes

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!doctorName || !patientName || !ageGender || !disease || !joiningDate || !refDoctor || !consultNo || !status) {
            setFormError("Please fill out all fields correctly.");
            return;
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            setFormError('');  // Reset error state before submission
        
            // Validate the form fields
            if (!doctorName || !patientName || !ageGender || !disease || !joiningDate || !refDoctor || !consultNo || !status) {
                setFormError("Please fill out all fields correctly.");
                return;  // Stop further processing if validation fails
            }
        
            // Proceed with the update if all fields are filled correctly
            const { data, error } = await supabase
                .from('patientsdata')
                .update({
                    doctor_name: doctorName.trim(),
                    patient_name: patientName.trim(),
                    age_and_gender: ageGender.trim(),
                    disease: disease.trim(),
                    joining_date: joiningDate,
                    referring_doctor: refDoctor.trim(),
                    consultation_number: consultNo.trim(),
                    Status: status.trim(),
                })
                .eq('id', id);  // Update the patient by ID
        
            if (error) {
                setFormError(`Submission error: ${error.message}`);
            } else if (data) {
                setFormError(null);  // Clear any previous errors
        
                // After successful update, navigate back to the list page
                navigate('/patients');
            }
        };
       
    };

    return (
        <div>
            <h1>Edit Patient</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="DoctorName">Doctor Name</label>
                <input
                    type="text"
                    id="DoctorName"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                />

                <label htmlFor="PatientName">Patient Name</label>
                <input
                    type="text"
                    id="PatientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                />

                <label htmlFor="AgeGender">Age/Gender</label>
                <input
                    type="text"
                    id="AgeGender"
                    value={ageGender}
                    onChange={(e) => setAgeGender(e.target.value)}
                />

                <label htmlFor="Disease">Disease</label>
                <input
                    type="text"
                    id="Disease"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                />

                <label htmlFor="JoiningDate">Joining Date</label>
                <input
                    type="date"
                    id="JoiningDate"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                />

                <label htmlFor="RefDoctor">Referring Doctor</label>
                <input
                    type="text"
                    id="RefDoctor"
                    value={refDoctor}
                    onChange={(e) => setRefDoctor(e.target.value)}
                />

                <label htmlFor="ConsultNo">Consultation No.</label>
                <input
                    type="text"
                    id="ConsultNo"
                    value={consultNo}
                    onChange={(e) => setConsultNo(e.target.value)}
                />

                <label htmlFor="status">Status</label>
                <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <button type="submit">Submit</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default PatientEdit;
