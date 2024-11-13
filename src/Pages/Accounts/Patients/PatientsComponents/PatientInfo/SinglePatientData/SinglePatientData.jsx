import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../../../../utilies/SupaBase';
import './SinglePatientData.scss';
import NavBar from '../../../../../../Components/NavBar/NavBar';
import SideBar from '../../../../Admin/AdminComponents/SiderBar/SideBar';

const SinglePatientData = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data, error } = await supabase
                    .from('patientsdata')
                    .select('patient_name, consultation_number, joining_date, Gender, disease, doctor_name, patient_img, address, phone_number, email_id')
                    .eq('id', Number(id))
                    .single();

                if (error) {
                    setError('Could not fetch patient data');
                } else {
                    setPatient(data);
                    setPreviewImage(data.patient_img);
                    setAddress(data.address || '');
                    setPhoneNumber(data.phone_number || '');
                    setEmail(data.email_id || '');
                }
            } catch (error) {
                setError('An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = `patient_${id}_${file.name.replace(/\s+/g, '_')}`;
            console.log("Uploading file:", fileName);  
            const { data, error: uploadError } = await supabase
                .storage
                .from('Doctors-profile-pic')
                .upload(fileName, file);
    
            if (uploadError) {
                console.error("Image upload failed:", uploadError.message);
                setError('Image upload failed');
            } else {
                const { data: urlData, error: urlError } = supabase
                    .storage
                    .from('Doctors-profile-pic')
                    .getPublicUrl(fileName);
    
                if (urlError) {
                    console.error("Failed to retrieve image URL:", urlError.message);
                    setError('Failed to retrieve image URL');
                } else {
                    console.log("Image uploaded successfully. URL:", urlData.publicUrl);
                    setPreviewImage(urlData.publicUrl);
                    setError(null);
                }
            }
        }
    };
    const handleSaveDetails = async () => {
        try {
            const { error: updateError } = await supabase
                .from('patientsdata')
                .update({
                    address,
                    phone_number: phoneNumber,
                    email_id: email,
                    patient_img: previewImage, 
                })
                .eq('id', Number(id));
    
            if (updateError) {
                console.error("Database update failed:", updateError.message);
                setError('Failed to save patient details');
            } else {
                setError(null);
                setIsEditing(false); 
                alert('Details updated successfully!');
            }
        } catch (error) {
            console.error("Unexpected error while saving patient details:", error);
            setError('An unexpected error occurred while saving patient details');
        }
    };

    if (loading) return <p>Loading patient details...</p>;
    if (error) return <p>{error}</p>;

    return (

        <>   <NavBar/>
            <SideBar/>
        <div className="single-patient-data">
         
            <h2>Patient Details</h2>
            {patient && (
                <div>
                    {isEditing ? (
                        <>
                             <div className="inputImg">
                                {isEditing && (
                                    <div>
                                        <input type="file" accept="image/*" onChange={handleImageChange} />
                                    </div>
                                )}
                            </div>
                            <div className="editable-field">
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                                <label><strong>Address:</strong></label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="editable-field">
                                <label><strong>Phone Number:</strong></label>
                                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            {/* <div className="editable-field">
                                <label><strong>Email:</strong></label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div> */}
                            <button onClick={handleSaveDetails}>Save Details</button>
                        </>
                    ) : (
                        <div className="info">
                            {previewImage && (
                                <img src={previewImage} alt="Uploaded Profile"className="preview-image"/>
                            )}
                            <p><strong>Patient Name:</strong> {patient.patient_name}</p>
                            <p><strong>Consultation Number:</strong> {patient.consultation_number}</p>
                            <p><strong>Check In Date:</strong> {patient.joining_date}</p>
                            <p><strong>Gender:</strong> {patient.Gender}</p>
                            <p><strong>Disease:</strong> {patient.disease}</p>
                            <p><strong>Doctor Name:</strong> {patient.doctor_name}</p>
                            <p><strong>Address:</strong> {address}</p>
                            <p><strong>Phone Number:</strong> {phoneNumber}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default SinglePatientData;
