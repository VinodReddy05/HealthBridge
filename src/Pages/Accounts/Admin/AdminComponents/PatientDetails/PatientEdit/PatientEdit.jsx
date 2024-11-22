import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../../../../utilies/SupaBase';
import "./PatientEdit.scss";

const PatientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [gender, setGender] = useState('');
    const [disease, setDisease] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [consultNo, setConsultNo] = useState('');
    const [status, setStatus] = useState('');
    const [formError, setFormError] = useState('');

    const specializations = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];
    const genders = ["Male", "Female"];
    const statuses = ["Emergency", "Normal"];

    // Function to generate consultation number if not present
    useEffect(() => {
        if (!consultNo) {
            const generatedConsultNo = `HB${Math.floor(1000 + Math.random() * 9000)}`;
            setConsultNo(generatedConsultNo);
        }
    }, [consultNo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!doctorName || !patientName || !gender || !disease || !joiningDate || !specialization || !consultNo || !status) {
            setFormError("Please fill out all fields correctly.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('patientsdata')
                .update({
                    doctor_name: doctorName.trim(),
                    name: patientName.trim(),
                    Gender: gender,
                    disease: disease.trim(),
                    joining_date: joiningDate,
                    specialization: specialization.trim(),
                    consultation_number: consultNo,
                    Status: status,
                })
                .eq('id', Number(id))
                .select();

            if (error) {
                setFormError(`Submission error: ${error.message}`);
            } else if (data && data.length > 0) {
                setFormError(null);
                navigate('/admin/patients');
            } else {
                setFormError("No patient data was updated, please check your input.");
            }
        } catch (error) {
            setFormError(`Error: ${error.message}`);
        }
    };

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
                setPatientName(patientData.name);
                setGender(patientData.Gender);
                setDisease(patientData.disease);
                setJoiningDate(patientData.joining_date);
                setSpecialization(patientData.specialization);
                setConsultNo(patientData.consultation_number || `HB${Math.floor(1000 + Math.random() * 9000)}`);
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
                <select
                    className="form-input"
                    id="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    {genders.map(genderOption => (
                        <option key={genderOption} value={genderOption}>
                            {genderOption}
                        </option>
                    ))}
                </select>

                <label className="form-label" htmlFor="Disease">Disease</label>
                <input
                    className="form-input"
                    type="text"
                    id="Disease"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                />

                <label className="form-label" htmlFor="JoiningDate">OP</label>
                <input
                    className="form-input"
                    type="date"
                    id="JoiningDate"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                />

                <label className="form-label" htmlFor="Specialization">Specialization</label>
                <select
                    className="form-input"
                    id="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                >
                    <option value="">Select Specialization</option>
                    {specializations.map(spec => (
                        <option key={spec} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>

                <label className="form-label" htmlFor="ConsultNo">Consultation No.</label>
                <input
                    className="form-input"
                    type="text"
                    id="ConsultNo"
                    value={consultNo}
                    disabled
                />

                <label className="form-label" htmlFor="Status">Status</label>
                <select
                    className="form-input"
                    id="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
        
                >
                    <option value="">Select Status</option>
                    {statuses.map(statusOption => (
                        <option key={statusOption} value={statusOption}>
                            {statusOption}
                        </option>
                    ))}
                </select>

                <button className="form-submit-button" type="submit">Update Details</button>
                {formError && <p className="form-error">{formError}</p>}
            </form>
        </div>
    );
};

export default PatientEdit;
