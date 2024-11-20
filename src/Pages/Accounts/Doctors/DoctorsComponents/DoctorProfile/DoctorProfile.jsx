

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../../../../../utilies/SupaBase"; 
// import "./DoctorProfile.scss";
// import NavBar from "../../../../../Components/NavBar/NavBar";
// import DoctorSidebar from "../DoctorsSidebar/DoctorsSidebar";

// const DoctorProfile = () => {
//   const { doctorId } = useParams(); 
//   console.log("Doctor ID from URL:", doctorId);
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       const doctorIdNumber = Number(doctorId); 
//       if (isNaN(doctorIdNumber)) {
//         setError("Invalid doctor ID");
//         setLoading(false);
//         return;
//       }

//       try {
       
//         const { data, error } = await supabase
//           .from("DoctorsData") 
//           .select()
//           .eq("id", doctorId)
//           .single();

       
//         if (error) {
//           setError("Could not fetch doctor data");
//           console.error("Error fetching doctor data:", error);
//         } else {
//           if (!data) {
//             setError("Doctor not found");
//             setLoading(false);
//             return;
//           }
//           console.log("Fetched doctor data:", data); 
//           setDoctor(data);
//           setPreviewImage(data.doctor_img);
//           setAddress(data.address || "");
//           setPhoneNumber(data.phone_number || "");
//           setEmail(data.email || "");
//         }
//       } catch (error) {
//         setError("An unexpected error occurred");
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [doctorId]);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileName = `doctor_${doctorId}_${file.name.replace(/\s+/g, "_")}`;
//       const { data, error: uploadError } = await supabase.storage
//         .from("Doctors-profile-pic")
//         .upload(fileName, file);

//       if (uploadError) {
//         setError("Image upload failed");
//         console.error("Image upload error:", uploadError);
//       } else {
//         const { data: urlData, error: urlError } = supabase.storage
//           .from("Doctors-profile-pic")
//           .getPublicUrl(fileName);

//         if (urlError) {
//           setError("Failed to retrieve image URL");
//           console.error("URL retrieval error:", urlError);
//         } else {
//           setPreviewImage(urlData.publicUrl);
//           setError(null);
//         }
//       }
//     }
//   };

//   const handleSaveDetails = async () => {
//     const doctorIdNumber = Number(doctorId);
//     try {
//       const { error: updateError } = await supabase
//         .from("DoctorsData")
//         .update({
//           address,
//           phone_number: phoneNumber,
//           email,
//           image_url: previewImage,
//         })
//         .eq("id", doctorIdNumber);

//       if (updateError) {
//         setError("Failed to save doctor details");
//         console.error("Update error:", updateError);
//       } else {
//         setIsEditing(false);
//         alert("Details updated successfully!");
//       }
//     } catch (error) {
//       setError("An unexpected error occurred while saving doctor details");
//       console.error("Save details error:", error);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;

//   return (
//     <>
//       <NavBar />
//       <DoctorSidebar doctorId={doctorId} />
//       <h1>Doctor Details</h1>
//       <div className="single-doctor-data">
//         {doctor && (
//           <div>
//             {isEditing ? (
//               <>
//                 <div className="inputImg">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </div>
//                 <div className="editable-field">
//                   <label>Address:</label>
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </div>
//                 <div className="editable-field">
//                   <label>Phone Number:</label>
//                   <input
                
//                  type="tel"
//                  value={phoneNumber}
//                  onChange={(e) => setPhoneNumber(e.target.value)}
//                  maxLength="10"
//                  pattern="\d{10}"
//                  placeholder="Enter 10-digit number"
//                  required
//                />
//                 </div>
//                 <div className="editable-field">
//                   <label>Email:</label>
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <button onClick={handleSaveDetails}>Save Details</button>
//               </>
//             ) : (
//               <div className="info">
//                 {previewImage && <img src={previewImage} alt="Doctor" />}
//                 <p>Doctor Name: {doctor.name}</p>
//                 <p>Specialization: {doctor.Designation}</p>
//                 <p>Phone Number: {phoneNumber}</p>
//                 <p>Email: {email}</p>
//                 <p>Address: {address}</p>
//                 <button onClick={() => setIsEditing(true)}>Edit</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DoctorProfile;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../../utilies/SupaBase";
import "./DoctorProfile.scss";
import NavBar from "../../../../../Components/NavBar/NavBar";
import DoctorSidebar from "../DoctorsSidebar/DoctorsSidebar";
import SchoolIcon from '@mui/icons-material/School';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import EmailIcon from '@mui/icons-material/Email';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';



const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data, error } = await supabase
          .from("DoctorsData")
          .select()
          .eq("id", doctorId)
          .single();

        if (error) throw new Error("Error fetching doctor data");
        setDoctor(data);
        setPreviewImage(data.image_url);
        setAddress(data.address || "");
        setDegree(data.phone_number || "");
        setEmail(data.email || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const fileName = `doctor_${doctorId}_${file.name.replace(/\s+/g, "_")}`;
  
      try {
        // Upload the new file to Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from("Doctors-profile-pic")
          .upload(fileName, file);
  
        if (uploadError) throw uploadError;
  
        // After upload, get the public URL
        const { data: urlData, error: urlError } = await supabase.storage
          .from("Doctors-profile-pic")
          .getPublicUrl(fileName);
  
        if (urlError) throw urlError;
  
        setPreviewImage(urlData.publicUrl);  // Save the image URL in the state
        setError(null);  // Clear any previous errors
      } catch (error) {
        setError("Image upload failed: " + error.message);
      }
    }
  };

  const handleSaveDetails = async () => {
    try {
      if (!previewImage) {
        setError("Please upload a profile picture.");
        return;
      }
  
      const { error } = await supabase
        .from("DoctorsData")
        .update({
          address,
          Degree: degree,
          image_url: previewImage, // Use the image URL from the upload
        })
        .eq("id", doctorId);
  
      if (error) throw new Error("Failed to update doctor details");
  
      // Update the localStorage after successful update
      const updatedDoctorData = { ...doctor, address,  Degree: degree, image_url: previewImage };
      localStorage.setItem("doctorData", JSON.stringify(updatedDoctorData));
  
      setIsEditing(false);
      alert("Details updated successfully!");
    } catch (error) {
      setError("Error updating details: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <NavBar />
      <DoctorSidebar doctorId={doctorId} />
      <div className="single-doctor-data">
        <div className="profile-header">
          {previewImage && <img src={previewImage} alt="Doctor" />}
          <div className="profile-details">
            <h2>{doctor?.name || "Doctor Name"}</h2>
            <p>{doctor?.Designation || "Specialization"}</p>
          </div>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        {isEditing ? (
          <div className="edit-section">
            <div className="editable-field">
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="editable-field">
              <label>Degree:</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}

                required
              />
            </div>
            <div className="editable-field">
              <label>Profile Picture:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="actions">
              <button onClick={handleSaveDetails}>Save Details</button>
            </div>
          </div>
        ) : (
          <div className="info">

            <div className="info-1">
            <p> <LocalHospitalIcon/> Specialization:<strong>{doctor.Designation}</strong> </p>
            <hr />
            <p> <LibraryBooksIcon/>  About:<strong>{doctor.info}</strong></p>

            </div>
            <div  className="info-2">
            <p> <SchoolIcon/> Degree:<strong>{doctor.Degree}</strong> </p>
            <p> <AddLocationIcon/> Address:<strong> {address}</strong> </p>
            <p> <EmailIcon/> Email:<strong>{doctor.email_id}</strong>  </p>
            </div>
            {/* <div className="info-1">
            </div> */}
           
              
              
              </div>
            )}
         
          

      </div>
    </>
  );
};

export default DoctorProfile;
