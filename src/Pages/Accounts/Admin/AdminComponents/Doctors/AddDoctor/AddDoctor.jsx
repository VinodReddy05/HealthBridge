import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../../../utilies/SupaBase';
import emailjs from 'emailjs-com';
import NavBar from '../../../../../../Components/NavBar/NavBar';
import SideBar from '../../SiderBar/SideBar';
import './AddDoctor.scss'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddDoctor = () => { 
   
   const navigate = useNavigate()
   const [name, setName] = useState('');
   const [designation, setDesignation] = useState('');
   const [info, setInfo] = useState('');
   const [rating, setRating] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [formError, setFormError] = useState('');
   const [showForm, setShowForm] = useState(false);

   const specializations = [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "Dermatology",
    ];

   const handleFileChange = (e) => {
      setImage(e.target.files[0]);
   };

   const generatePassword = () => {
      const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      const newPassword = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
      setPassword(newPassword);
   };

   useEffect(() => {
      if (email) generatePassword();
   }, [email]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted");
      console.log("Doctor Name:", name);
      console.log("Designation:", designation);
      console.log("Info:", info);
      console.log("Rating:", rating);
      console.log("Email:", email); 
      setFormError('');
   
      const trimmedName = name.trim();
      const trimmedDesignation = designation.trim();
      const trimmedInfo = info.trim();
      const parsedRating = Number(rating.trim());
   
      if (!trimmedName || !trimmedDesignation || !trimmedInfo || isNaN(parsedRating) || !email) {
         setFormError("Please fill out all fields correctly, including a valid email and rating.");
         return;
      }
   
      try {
         const { data, error } = await supabase
            .from('DoctorsData')
            .insert([{
               name: trimmedName,
               Designation: trimmedDesignation,
               info: trimmedInfo,
               rating: parsedRating,
               email_id: email,
               password
            }]);
   
         if (error) {
            console.error('Insert error:', error);
            setFormError(`There was an issue submitting the form: ${error.message}`);
         } else {
            setTimeout(() => {
               toast.success("Successfully added Doctor details");
            }, 1500);  
   
            sendEmail();
   
            setTimeout(() => {
               navigate("/admin/doctors");
            }, 2500); 
         }
      } catch (error) {
         console.error("Error during form submission:", error);
         setTimeout(() => {
            toast.error("Unexpected error occurred. Please try again.");
         }, 500); 
         setFormError("Unexpected error occurred. Please try again.");
      }
   };
   
   const sendEmail = () => {
      console.log('Attempting to send email...');
      setTimeout(() => {
         toast.info("Attempting to send email...");
      }, 500);  
   
      const userTemplateParams = {
         to_email: email,
         name,
         message: `Welcome! Here is your generated password: ${password}`
      };
   
      emailjs.send('service_bij7amq', 'template_2qsut27', userTemplateParams, 'oNdVP1DnDdfn_f0zA')
         .then(
            (response) => {
               console.log('Email sent successfully:', response);
               setTimeout(() => {
                  toast.success("Email sent successfully");
               }, 1000); 
            },
            (error) => {
               console.error('Failed to send email:', error);
               setTimeout(() => {
                  toast.error("Failed to send email. Please check your EmailJS configuration.");
               }, 1000);  
            }
         );
   };


   return (
      <>
         <SideBar/>
      <div className='page-create'>
         <h1>Add Doctor</h1>
         <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
               type="text"
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />

            <label htmlFor="designation">Designation</label>
            <select
               id="specializations"
               value={designation}
               onChange={(e) => setDesignation(e.target.value)}
               required
            >
               <option value="">Select Designation</option>
               {specializations && specializations.map((designationOption, index) => (
                  <option key={index} value={designationOption}>
                     {designationOption}
                  </option>
               ))}
            </select>

            <label htmlFor="info">Info</label>
            <textarea
               id="info"
               value={info}
               onChange={(e) => setInfo(e.target.value)}
               required
            />

            <label htmlFor="rating">Rating</label>
            <input
               type="number"
               id="rating"
               value={rating}
               onChange={(e) => setRating(e.target.value)}
               required
            />

            <label htmlFor="email">Email</label>
            <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />

            <button type="submit">Submit</button>

            {formError && <p className='error'>{formError}</p>}
         </form>
      </div>
      </>
   );
};

export default AddDoctor;
