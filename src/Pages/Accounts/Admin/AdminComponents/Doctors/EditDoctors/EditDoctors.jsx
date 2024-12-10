import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../../../../utilies/SupaBase';
import "./EditDoctors.scss";

const EditDoctors = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctorName, setDoctorName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [degree, setDegree] = useState('');
    const [formError, setFormError] = useState('');

    const Designation = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];
    const genders = ["Male", "Female"];
    const statuses = ["Active", "Inactive"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
    
        const updates = {};
        if (doctorName.trim()) updates.name = doctorName.trim();
        if (specialization.trim()) updates.Designation = specialization.trim();
        if (degree.trim()) updates.Degree = degree.trim();
    
        if (Object.keys(updates).length === 0) {
            setFormError('Please modify at least one field before submitting.');
            return;
        }
    
        try {
            const { data, error } = await supabase
                .from('DoctorsData')  
                .update(updates)
                .eq('id', Number(id))
                .select();
    
            if (error) {
                console.error('Error while updating:', error);
                setFormError(`Submission error: ${error.message}`);
            } else if (data && data.length > 0) {
                setFormError(null);
                navigate('/admin/doctors');  
            } else {
                setFormError('No doctor data was updated. Please check your input.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setFormError(`Error: ${error.message}`);
        }
    };
    
 

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

                <button className="form-submit-button" type="submit">Update Details</button>
                {formError && <p className="form-error">{formError}</p>}
            </form>
        </div>
    );
};

export default EditDoctors;
