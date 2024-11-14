import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../../utilies/SupaBase"; 
import "./DoctorProfile.scss";
import NavBar from "../../../../../Components/NavBar/NavBar";
import DoctorSidebar from "../DoctorsSidebar/DoctorsSidebar";

const DoctorProfile = () => {
  const { id } = useParams(); // Get the doctor ID from the URL parameters
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorId = Number(id); // Convert the ID to a number
      if (isNaN(doctorId)) {
        setError("Invalid doctor ID");
        setLoading(false);
        return;
      }

      try {
        // Fetch doctor details from the DoctorsData table
        const { data, error } = await supabase
          .from("DoctorsData") // Change to DoctorsData
          .select()
          .eq("id", doctorId)
          .single();

        if (error) {
          setError("Could not fetch doctor data");
        } else {
          setDoctor(data);
          setPreviewImage(data.doctor_img);
          setAddress(data.address || "");
          setPhoneNumber(data.phone_number || "");
          setEmail(data.email || "");
        }
      } catch (error) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = `doctor_${id}_${file.name.replace(/\s+/g, "_")}`;
      const { data, error: uploadError } = await supabase.storage
        .from("Doctors-profile-pic")
        .upload(fileName, file);

      if (uploadError) {
        setError("Image upload failed");
      } else {
        const { data: urlData, error: urlError } = supabase.storage
          .from("Doctors-profile-pic")
          .getPublicUrl(fileName);

        if (urlError) {
          setError("Failed to retrieve image URL");
        } else {
          setPreviewImage(urlData.publicUrl);
          setError(null);
        }
      }
    }
  };

  const handleSaveDetails = async () => {
    const doctorId = Number(id);
    try {
      const { error: updateError } = await supabase
        .from("DoctorsData")
        .update({
          address,
          phone_number: phoneNumber,
          email,
          doctor_img: previewImage,
        })
        .eq("id", doctorId);

      if (updateError) {
        setError("Failed to save doctor details");
      } else {
        setIsEditing(false);
        alert("Details updated successfully!");
      }
    } catch (error) {
      setError("An unexpected error occurred while saving doctor details");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <>
      <NavBar />
      <DoctorSidebar doctorId={id} />
      <h1>Doctor Details</h1>
      <div className="single-doctor-data">
        {doctor && (
          <div>
            {isEditing ? (
              <>
                <div className="inputImg">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="editable-field">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="editable-field">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="editable-field">
                  <label>Email:</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button onClick={handleSaveDetails}>Save Details</button>
              </>
            ) : (
              <div className="info">
                {previewImage && <img src={previewImage} alt="Doctor" />}
                <p>Doctor Name: {doctor.name}</p>
                <p>Specialization: {doctor.Designation}</p>
                <p>Phone Number: {phoneNumber}</p>
                <p>Email: {email}</p>
                <p>Address: {address}</p>
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorProfile;
