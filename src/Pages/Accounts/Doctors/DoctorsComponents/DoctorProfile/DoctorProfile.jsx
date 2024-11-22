// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../../../../../utilies/SupaBase";
// import "./DoctorProfile.scss";
// import NavBar from "../../../../../Components/NavBar/NavBar";
// import DoctorSidebar from "../DoctorsSidebar/DoctorsSidebar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DoctorProfile = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [address, setAddress] = useState("");
//   const [degree, setDegree] = useState("");
//   const [email, setEmail] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   // State for dynamically loaded section data
//   const [activeProject, setActiveProject] = useState(0); // Default to "Overview"
//   const [sectionData, setSectionData] = useState(null); // To store fetched section data

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("DoctorsData")
//           .select()
//           .eq("id", doctorId)
//           .single();

//         if (error) throw new Error("Error fetching doctor data");

//         setDoctor(data);
//         setPreviewImage(data.image_url);
//         setAddress(data.address || "");
//         setDegree(data.phone_number || "");
//         setEmail(data.email || "");
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [doctorId]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreviewImage(event.target.result); // Update the preview image
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveDetails = async () => {
//     try {
//       const updates = {
//         address,
//         Degree: degree, // Use the correct column name
//       };

//       // Handle image upload
//       if (previewImage && typeof previewImage !== "string") {
//         const file = document.querySelector("input[type='file']").files[0];
//         if (file) {
//           const { data, error } = await supabase.storage
//             .from("Doctors-profile-pic")
//             .upload(`doctors/${doctorId}`, file, {
//               cacheControl: "3600",
//               upsert: true,
//             });

//           if (error) throw error;

//           // Get the public URL of the uploaded image
//           const { publicUrl, error: urlError } = supabase.storage
//             .from("Doctors-profile-pic")

//             .getPublicUrl(`doctors/${doctorId}`);

//           if (urlError) throw urlError;

//           updates.image_url = publicUrl;
//         }
//       }

//       const { data, error: updateError } = await supabase
//         .from("DoctorsData")
//         .update(updates)
//         .eq("id", doctorId);

//       if (updateError) {
//         console.error("Update error:", updateError.message);
//         alert(`Failed to update: ${updateError.message}`);
//       } else {
//         console.log("Update successful:", data);
//         alert("Details updated successfully!");
//         setIsEditing(false);
//       }
//     } catch (err) {
//       console.error("Error updating doctor details:", err.message);
//       alert("Failed to update details. Please try again.");
//     }
//   };

//   // Function to fetch data for the selected section
//   const fetchSectionData = async (sectionIndex) => {
//     let sectionField;
//     if (sectionIndex === 0) sectionField = "info"; // Overview
//     if (sectionIndex === 1) sectionField = "DoctorAwards"; // Doctors Awards
//     if (sectionIndex === 2) sectionField = "Research"; // Research

//     try {
//       const { data, error } = await supabase
//         .from("DoctorsData")
//         .select(sectionField)
//         .eq("id", doctorId)
//         .single();

//       if (error) throw error;
//       setSectionData(data[sectionField]); // Update section data state
//     } catch (err) {
//       console.error("Error fetching section data:", err.message);
//       setSectionData(null);
//     }
//   };

//   // Handle button click to fetch and display data for the section
//   const toggleProjectDetail = (index) => {
//     setActiveProject(index); // Update active section
//     fetchSectionData(index); // Fetch data for the selected section
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;

//   return (
//     <>
//       <NavBar />
//       <DoctorSidebar doctorId={doctorId} />
//       <div className="single-doctor-data">
//         <div className="profile-header">
//           {previewImage && <img src={previewImage} alt="Doctor" />}
//           <div className="profile-details">
//             <h2>{doctor?.name || "Doctor Name"}</h2>
//             <p>{doctor?.Designation || "Specialization"}</p>
//             <p>{doctor?.Degree || "Degree"}</p>
//             <p>{doctor?.address || "Address"}</p>
//             <p>{doctor?.Language || "Language"}</p>
//           </div>
//           <button onClick={() => setIsEditing(!isEditing)}>
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//         </div>

//         {isEditing ? (
//           <div className="edit-section">
//             <div className="editable-field">
//               <label>Address:</label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </div>
//             <div className="editable-field">
//               <label>Degree:</label>
//               <input
//                 type="text"
//                 value={degree}
//                 onChange={(e) => setDegree(e.target.value)}
//               />
//             </div>
//             <div className="editable-field">
//               <label>Profile Picture:</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   setPreviewImage(URL.createObjectURL(e.target.files[0]))
//                 }
//               />
//             </div>
//             <div className="actions">
//               <button onClick={handleSaveDetails}>Save Details</button>
//             </div>
//           </div>
//         ) : null}

//         <div className="info">
//           {/* Section Buttons */}
//           <div className="info-buttons">
//             {["Overview", "Doctors Awards", "Research"].map(
//               (section, index) => (
//                 <button
//                   key={index}
//                   className={activeProject === index ? "active1" : ""}
//                   onClick={() => toggleProjectDetail(index)}
//                 >
//                   {section}
//                 </button>
//               )
//             )}
//           </div>

//           {/* Section Content */}
//           <div className="info-content">
//             {sectionData ? (
//               Array.isArray(sectionData) ? (
//                 <ul>
//                   {sectionData.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div>{sectionData}</div>
//               )
//             ) : (
//               <p>Select a section to view details.</p>
//             )}
//           </div>
//         </div>
//         <ToastContainer />
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [activeProject, setActiveProject] = useState(0);
  const [sectionData, setSectionData] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDetails = async () => {
    try {
      const updates = {
        address,
        Degree: degree,
      };

      if (previewImage && typeof previewImage !== "string") {
        const file = document.querySelector("input[type='file']").files[0];
        if (file) {
          const { data, error } = await supabase.storage
            .from("Doctors-profile-pic")
            .upload(`doctors/${doctorId}`, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (error) throw error;

          const { publicUrl, error: urlError } = supabase.storage
            .from("Doctors-profile-pic")
            .getPublicUrl(`doctors/${doctorId}`);

          if (urlError) throw urlError;

          updates.image_url = publicUrl;
        }
      }

      const { data, error: updateError } = await supabase
        .from("DoctorsData")
        .update(updates)
        .eq("id", doctorId);

      if (updateError) {
        console.error("Update error:", updateError.message);
        alert(`Failed to update: ${updateError.message}`);
      } else {
        console.log("Update successful:", data);
        const toastId = toast.loading("Data Submitting!!!!");
        setTimeout(() => {
          toast.dismiss(toastId); // Dismiss the specific toast
          toast.success("Details updated successfully!");
        }, 1500);

        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating doctor details:", err.message);
      const toastId = toast.loading("Data Submitting!!!!");
      setTimeout(() => {
        toast.dismiss(toastId); // Dismiss the specific toast
        toast.error("Failed to update details. Please try again.");

      }, 1500);
    }
  };

  const fetchSectionData = async (sectionIndex) => {
    let sectionField;
    if (sectionIndex === 0) sectionField = "info";
    if (sectionIndex === 1) sectionField = "DoctorAwards";
    if (sectionIndex === 2) sectionField = "Research";

    try {
      const { data, error } = await supabase
        .from("DoctorsData")
        .select(sectionField)
        .eq("id", doctorId)
        .single();

      if (error) throw error;
      setSectionData(data[sectionField]);
    } catch (err) {
      console.error("Error fetching section data:", err.message);
      setSectionData(null);
    }
  };

  const toggleProjectDetail = (index) => {
    setActiveProject(index);
    fetchSectionData(index);
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
            <p>{doctor?.Degree || "Degree"}</p>
            <p>{doctor?.address || "Address"}</p>
            <p>{doctor?.Language || "Language"}</p>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>

        <div className="info">
          <div className="info-buttons">
            {["Overview", "Doctors Awards", "Research"].map(
              (section, index) => (
                <button
                  key={index}
                  className={activeProject === index ? "active1" : ""}
                  onClick={() => toggleProjectDetail(index)}
                >
                  {section}
                </button>
              )
            )}
          </div>

          <div className="info-content">
            {sectionData ? (
              Array.isArray(sectionData) ? (
                <ul>
                  {sectionData.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div>{sectionData}</div>
              )
            ) : (
              <p>Select a section to view details.</p>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>

      {isEditing && (
        <div className="popform">
          <div className="popform-content">
            <div className="popform-header">
              <h3>Edit Doctor Details</h3>
              <button onClick={() => setIsEditing(false)}>Close</button>
            </div>
            <div className="popform-body">
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
                />
              </div>
              <div className="editable-field">
                <label>Profile Picture:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="popform-footer">
              <button onClick={handleSaveDetails}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorProfile;
