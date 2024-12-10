import React, { useState, useRef, useEffect } from "react";
import "./AddNewPatient.scss";
import { supabase } from "../../../../../../utilies/SupaBase";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const form = useRef();

  const specializations = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
  ];

  const generatePassword = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const newPassword = Array.from(
      { length: 6 },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
    setPassword(newPassword);
  };

  useEffect(() => {
    const generateConsultationNumber = () => {
      const newConsultNo = `HB${Math.floor(1000 + Math.random() * 9000)}`;
      setConsultNo(newConsultNo);
    };
    generateConsultationNumber();
  }, []);

  useEffect(() => {
    if (email) generatePassword();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      toast.error("Please fill out all fields correctly.")
    }

    try {
      const { data, error } = await supabase.from("patientsdata").insert([
        {
          doctor_name: doctorName.trim(),
          name: patientName.trim(),
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
      toast.success("Successfully added patient details")
      if (error) {
        toast.error("Submission error:")
      } else {
        sendEmail() ;
      
        setTimeout(() => {
        navigate("/admin/patients");
        },1500);
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
      toast.error("Unexpected error occurred. Please try again.")
    }
  };

  const sendEmail = () => {
    const userTemplateParams = {
      to_email: email,
      name: patientName,
      message:  `Welcome! Here is your generated password: ${password}`,
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
          toast.success("Email sent successfully" )
          console.log("Email sent successfully:",response );
         
        },
        (error) => {
          toast.error("Failed to send email. Please check your EmailJS configuration.")
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
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddNewPatient;
