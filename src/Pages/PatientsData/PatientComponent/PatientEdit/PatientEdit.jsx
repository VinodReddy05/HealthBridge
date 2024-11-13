import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../../utilies/SupaBase';
import "./PatientEdit.scss";

const PatientEdit = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [disease, setDisease] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [refDoctor, setRefDoctor] = useState('');
    const [consultNo, setConsultNo] = useState('');
    const [status, setStatus] = useState('');
    const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!doctorName || !patientName || !gender || !disease || !joiningDate || !refDoctor || !consultNo || !status) {
        setFormError("Please fill out all fields correctly.");
        return;
    }

    try {
        const { data, error } = await supabase
            .from('patientsdata')
            .update({
                doctor_name: doctorName.trim(),
                patient_name: patientName.trim(),
                Gender: gender.trim(),
                disease: disease.trim(),
                joining_date: joiningDate,
                referring_doctor: refDoctor.trim(),
                consultation_number: typeof consultNo === 'string' ? consultNo.trim() : consultNo,
                Status: status.trim(),
            })
            .eq('id', Number(id))
            .select();
    
        if (error) {
            setFormError(`Submission error: ${error.message}`);
        } else if (data && data.length > 0) {
            setFormError(null);
            navigate('/patients');
        } else {
            setFormError("No patient data was updated, please check your input.");
        }
    } catch (error) {
        setFormError(`Error: ${error.message}`);
    }}

    useEffect(() => {
        const fetchPatient = async () => {
            const { data: patientData, error: fetchError } = await supabase
                .from('patientsdata')
                .select()
                .eq('id', id)  
                .single();  
    
            if (fetchError) {
                navigate('/patients', { replace: true });
                setFormError("Patient data could not be fetched.");
            } else if (patientData) {
                setDoctorName(patientData.doctor_name);
                setPatientName(patientData.patient_name);
                setGender(patientData.Gender);
                setDisease(patientData.disease);
                setJoiningDate(patientData.joining_date);
                setRefDoctor(patientData.referring_doctor);
                setConsultNo(patientData.consultation_number);
                setStatus(patientData.Status);
            }
        };
        
        fetchPatient();
    }, [id, navigate]); 
    

    return (
        <div className="patient-edit-container">
            <h1 className="patient-edit-title">Edit Patient</h1>
            <form className="patient-edit-form" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="DoctorName">Doctor Name</label>
                <input
                    className="form-input"
                    type="text"
                    id="DoctorName"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                />

                <label className="form-label" htmlFor="PatientName">Patient Name</label>
                <input
                    className="form-input"
                    type="text"
                    id="PatientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                />

                <label className="form-label" htmlFor="Gender">Gender</label>
                <input
                    className="form-input"
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />

                <label className="form-label" htmlFor="Disease">Disease</label>
                <input
                    className="form-input"
                    type="text"
                    id="Disease"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                />

                <label className="form-label" htmlFor="JoiningDate">Joining Date</label>
                <input
                    className="form-input"
                    type="date"
                    id="JoiningDate"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                />

                <label className="form-label" htmlFor="RefDoctor">Referring Doctor</label>
                <input
                    className="form-input"
                    type="text"
                    id="RefDoctor"
                    value={refDoctor}
                    onChange={(e) => setRefDoctor(e.target.value)}
                />

                <label className="form-label" htmlFor="ConsultNo">Consultation No.</label>
                <input
                    className="form-input"
                    type="text"
                    id="ConsultNo"
                    value={consultNo}
                    onChange={(e) => setConsultNo(e.target.value)}
                />

                <label className="form-label" htmlFor="status">Status</label>
                <input
                    className="form-input"
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <button className="form-submit-button" type="submit">Updated the details</button>
                {formError && <p className="form-error">{formError}</p>}
            </form>
        </div>
    );
};

export default PatientEdit;
