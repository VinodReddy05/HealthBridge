// import React, { useState, useRef, useEffect } from 'react';
// import './AddNewPatient.scss';
// import { supabase } from '../../../../../../utilies/SupaBase';
// import { useNavigate } from 'react-router-dom';
// import emailjs from 'emailjs-com';

// const AddNewPatient = () => {
//   const navigate = useNavigate();

//   const [password, setPassword] = useState('');
//   const [doctorName, setDoctorName] = useState('');
//   const [patientName, setPatientName] = useState('');
//   const [gender, setGender] = useState('');
//   const [disease, setDisease] = useState('');
//   const [joiningDate, setJoiningDate] = useState('');
//   const [refDoctor, setRefDoctor] = useState('');
//   const [consultNo, setConsultNo] = useState('');
//   const [email, setEmail] = useState('');
//   const [status, setStatus] = useState('');
//   const [formError, setFormError] = useState('');
//   const form = useRef();

//   // Password generation logic
//   const generatePassword = () => {
//     const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
//     const newPassword = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
//     setPassword(newPassword);
//   };

//   // Trigger password generation on email entry
//   useEffect(() => {
//     if (email) generatePassword();
//   }, [email]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     console.log("Doctor Name:", doctorName);
//     console.log("Patient Name:", patientName);
//     console.log("Gender:", gender);
//     console.log("Email:", email);
//     setFormError('');

//     // Check if all fields are filled
//     if (!doctorName || !patientName || !gender || !disease || !joiningDate || !email || !refDoctor || !consultNo || !status) {
//       setFormError("Please fill out all fields correctly.");
//       return;
//     }

//     try {
//       // Insert data into Supabase
//       const { data, error } = await supabase
//         .from('patientsdata')
//         .insert([{
//           doctor_name: doctorName.trim(),
//           patient_name: patientName.trim(),
//           Gender: gender.trim(),
//           disease: disease.trim(),
//           joining_date: joiningDate,
//           email_id: email,
//           referring_doctor: refDoctor.trim(),
//           consultation_number: consultNo.trim(),
//           Status: status.trim(),
//           password,  // Save the generated password
//         }]);

//       if (error) {
//         setFormError(`Submission error: ${error.message}`);
//       }
//       // else if (data) {
//       //   console.log("Data inserted into Supabase", data);
//       //   console.log("Email:", email);
//       //   // Send email after successful submission
//       //   sendEmail();

//       //   // Clear form fields
//       //   setDoctorName('');
//       //   setPatientName('');
//       //   setGender('');
//       //   setDisease('');
//       //   setJoiningDate('');
//       //   setEmail('');
//       //   setRefDoctor('');
//       //   setConsultNo('');
//       //   setStatus('');

//       // }

//       else{
//         console.log("Successfully inserted data into Supabase:", data);
//       sendEmail();
//       }
//       navigate('/patients');  // Navigate to the patients page after successful submission
//     } catch (error) {
//       console.error("Error during form submission:", error);
//       setFormError("Unexpected error occurred. Please try again.");
//     }
//   };

//   // Email sending logic
//   const sendEmail = () => {
//     console.log("Preparing to send email...");
//     const userTemplateParams = {
//       to_email: email,
//       name: patientName,
//       message: `Welcome! Here is your generated password: ${password}`,
//     };

//     emailjs.send('service_bij7amq', 'template_2qsut27', userTemplateParams, 'oNdVP1DnDdfn_f0zA')
//     .then(
//       (response) => {
//         console.log('Email sent successfully:', response);
//         alert('Email sent successfully');
//       },
//       (error) => {
//         console.log('FAILED to send email...', error.text);
//         alert('Failed to send email. Please check your EmailJS configuration.');
//       }
//     );
//   };

//   return (
//     <div className='patientDetail'>
//       <h2>Add Patient Details</h2>
//       <form ref={form} onSubmit={handleSubmit}>
//         <label htmlFor="DoctorName">Doctor Name</label>
//         <input type="text" id="DoctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />

//         <label htmlFor="PatientName">Patient Name</label>
//         <input type="text" id="PatientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />

//         <label htmlFor="gender">Gender</label>
//         <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required />

//         <label htmlFor="Disease">Disease</label>
//         <input type="text" id="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} required />

//         <label htmlFor="JoiningDate">Joining Date</label>
//         <input type="date" id="JoiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} required />

//         <label htmlFor="email">Email</label>
//         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

//         <label htmlFor="RefDoctor">Referring Doctor</label>
//         <input type="text" id="RefDoctor" value={refDoctor} onChange={(e) => setRefDoctor(e.target.value)} required />

//         <label htmlFor="ConsultNo">Consultation No.</label>
//         <input type="text" id="ConsultNo" value={consultNo} onChange={(e) => setConsultNo(e.target.value)} required />

//         <label htmlFor="status">Status</label>
//         <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required />

//         <button type="submit">Submit</button>
//         {formError && <p className='error'>{formError}</p>}
//       </form>
//     </div>
//   );
// };

// export default AddNewPatient;

import React, { useState, useRef, useEffect } from "react";
import "./AddNewPatient.scss";
import { supabase } from "../../../../../../utilies/SupaBase";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const AddNewPatient = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [disease, setDisease] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [consultNo, setConsultNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [formError, setFormError] = useState("");
  const form = useRef();

  const specializations = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
  ];

  // Password generation logic
  const generatePassword = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const newPassword = Array.from(
      { length: 6 },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
    setPassword(newPassword);
  };

  // Generate consultation number
  useEffect(() => {
    const generateConsultationNumber = () => {
      const newConsultNo = `HB${Math.floor(1000 + Math.random() * 9000)}`;
      setConsultNo(newConsultNo);
    };
    generateConsultationNumber();
  }, []);

  // Trigger password generation on email entry
  useEffect(() => {
    if (email) generatePassword();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !doctorName ||
      !patientName ||
      !gender ||
      !disease ||
      !joiningDate ||
      !email ||
      !consultNo ||
      !status ||
      !specialization
    ) {
      setFormError("Please fill out all fields correctly.");
      return;
    }

    try {
      console.log("Inserting data into Supabase...");
      const { data, error } = await supabase.from("patientsdata").insert([
        {
          doctor_name: doctorName.trim(),
          patient_name: patientName.trim(),
          Gender: gender,
          disease: disease.trim(),
          joining_date: joiningDate,
          email_id: email,
          consultation_number: consultNo,
          specialization: specialization,
          Status: status,
          password,
        },
      ]);
      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error("Supabase insertion error:", error.message);
        setFormError(`Submission error: ${error.message}`);
      } else {
        console.log("Successfully inserted data into Supabase:", data);
        sendEmail();
        navigate("/patients");
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
      setFormError("Unexpected error occurred. Please try again.");
    }
  };

  const sendEmail = () => {
    const userTemplateParams = {
      to_email: email,
      name: patientName,
      message: `Welcome! Here is your generated password: ${password}`,
    };

    emailjs
      .send(
        "service_bij7amq",
        "template_2qsut27",
        userTemplateParams,
        "oNdVP1DnDdfn_f0zA"
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          alert("Email sent successfully");
        },
        (error) => {
          console.log("FAILED to send email...", error.text);
          alert(
            "Failed to send email. Please check your EmailJS configuration."
          );
        }
      );
  };

  return (
    <div className="patientDetail">
      <h2>Add Patient Details</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <label htmlFor="DoctorName">Doctor Name</label>
        <input
          type="text"
          id="DoctorName"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          required
        />

        <label htmlFor="PatientName">Patient Name</label>
        <input
          type="text"
          id="PatientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="Disease">Disease</label>
        <input
          type="text"
          id="Disease"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          required
        />

        <label htmlFor="JoiningDate">OP</label>
        <input
          type="date"
          id="JoiningDate"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
          required
        />

        <label htmlFor="specialization">Specialization</label>
        <select
          id="specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        >
          <option value="">Select Specialization</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="ConsultNo">Consultation No.</label>
        <input type="text" id="ConsultNo" value={consultNo} disabled />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="Emergency">Emergency</option>
          <option value="Normal">Normal</option>
        </select>

        <button type="submit">Submit</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default AddNewPatient;
