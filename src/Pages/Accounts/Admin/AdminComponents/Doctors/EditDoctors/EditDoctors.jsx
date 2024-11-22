import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../../../../utilies/SupaBase';
import "./EditDoctors.scss";

const EditDoctors = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State variables for doctor data
    const [doctorName, setDoctorName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [degree, setDegree] = useState('');
    // const [experience, setExperience] = useState('');
    // const [qualification, setQualification] = useState('');
    // const [gender, setGender] = useState('');
    // const [consultNo, setConsultNo] = useState('');
    // const [status, setStatus] = useState('');
    const [formError, setFormError] = useState('');

    // Static options
    const Designation = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];
    const genders = ["Male", "Female"];
    const statuses = ["Active", "Inactive"];

    // Generate consultation number if not present
    // useEffect(() => {
    //     if (!consultNo) {
    //         const generatedConsultNo = `DOC${Math.floor(1000 + Math.random() * 9000)}`;
    //         setConsultNo(generatedConsultNo);
    //     }
    // }, [consultNo]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
    
        // Create an update object with only the modified fields
        const updates = {};
        if (doctorName.trim()) updates.name = doctorName.trim();
        if (specialization.trim()) updates.Designation = specialization.trim();
        if (degree.trim()) updates.Degree = degree.trim();
    
        // Proceed only if there are fields to update
        if (Object.keys(updates).length === 0) {
            setFormError('Please modify at least one field before submitting.');
            return;
        }
    
        try {
            const { data, error } = await supabase
                .from('DoctorsData') // Ensure this matches your table name
                .update(updates)
                .eq('id', Number(id))
                .select();
    
            if (error) {
                console.error('Error while updating:', error);
                setFormError(`Submission error: ${error.message}`);
            } else if (data && data.length > 0) {
                setFormError(null);
                navigate('/admin/doctors'); // Redirect to doctor list after successful update
            } else {
                setFormError('No doctor data was updated. Please check your input.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setFormError(`Error: ${error.message}`);
        }
    };
    
 

    // Fetch doctor data to prefill the form
    useEffect(() => {
      const fetchDoctor = async () => {
          const { data: doctorData, error: fetchError } = await supabase
              .from('DoctorsData')
              .select()
              .eq('id', id)
              .single();
  
          if (fetchError) {
              console.error(fetchError);
              setFormError("Doctor data could not be fetched.");
              navigate('/admin/doctors', { replace: true });
          } else {
              console.log("Fetched doctor:", doctorData);
              if (doctorData) {
                  setDoctorName(doctorData.name);
                  setSpecialization(doctorData.Designation);
                  // Set other state variables as necessary
              }
          }
      };
  
      fetchDoctor();
  }, [id, navigate]);
  
    return (
        <div className="doctor-edit-container">
            <h1 className="doctor-edit-title">Edit Doctor</h1>
            <form className="doctor-edit-form" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="DoctorName">Doctor Name</label>
                <input
                    className="form-input"
                    type="text"
                    id="DoctorName"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                />

                <label className="form-label" htmlFor="Specialization">Specialization</label>
                <select
                    className="form-input"
                    id="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                >
                    <option value="">Select Specialization</option>
                    {Designation.map(spec => (
                        <option key={spec} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>

                <label className="form-label" htmlFor="Experience">Degree</label>
                <input
                    className="form-input"
                    type="text"
                    id="Degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                />

                {/* <label className="form-label" htmlFor="Qualification">Qualification</label>
                <input
                    className="form-input"
                    type="text"
                    id="Qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                /> */}

                {/* <label className="form-label" htmlFor="Gender">Gender</label>
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
                </select> */}
{/* 
                <label className="form-label" htmlFor="ConsultNo">Consultation No.</label>
                <input
                    className="form-input"
                    type="text"
                    id="ConsultNo"
                    value={consultNo}
                    disabled
                /> */}

                {/* <label className="form-label" htmlFor="Status">Status</label>
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
                </select> */}

                <button className="form-submit-button" type="submit">Update Details</button>
                {formError && <p className="form-error">{formError}</p>}
            </form>
        </div>
    );
};

export default EditDoctors;
