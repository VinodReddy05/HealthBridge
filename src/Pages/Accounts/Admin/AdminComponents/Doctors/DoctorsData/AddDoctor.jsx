
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../../../utilies/SupaBase';
import emailjs from 'emailjs-com';

const AddDoctor = ({ refreshDoctors }) => {
   const [name, setName] = useState('');
   const [designation, setDesignation] = useState('');
   const [info, setInfo] = useState('');
   const [rating, setRating] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [image, setImage] = useState(null);
   const [formError, setFormError] = useState('');
   const [showForm, setShowForm] = useState(false);

   const handleFileChange = (e) => {
      setImage(e.target.files[0]);
   };

   // Password generation logic
   const generatePassword = () => {
      const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      const newPassword = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
      setPassword(newPassword);
   };

   // Trigger password generation when email is entered
   useEffect(() => {
      if (email) generatePassword();
   }, [email]);

   const handleImageUpload = async (file) => {
      if (!file) return null;
      const fileName = `${Date.now()}_${file.name}`;
      console.log('Uploading image with filename:', fileName);

      const { data, error } = await supabase
         .storage
         .from('Doctors-profile-pic')
         .upload(fileName, file);

      if (error) {
         console.error('Image upload error:', error);
         setFormError('Failed to upload image.');
         return null;
      }

      const { publicUrl } = supabase
         .storage
         .from('Doctors-profile-pic')
         .getPublicUrl(fileName).data;

      return publicUrl || null;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted");
      // console.log("Doctor Name:", );
      console.log("Patient Name:", info);
      console.log("Gender:", rating);
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

      let imageUrl = null;
      if (image) {
         imageUrl = await handleImageUpload(image);
         if (!imageUrl) return;
      }

      try {
         const { data, error } = await supabase
            .from('DoctorsData')
            .insert([{
               name: trimmedName,
               Designation: trimmedDesignation,
               info: trimmedInfo,
               rating: parsedRating,
               image_url: imageUrl,
               email_id: email,
               password  // Save the generated password for login
            }]);

         if (error) {
            console.error('Insert error:', error);
            setFormError(`There was an issue submitting the form: ${error.message}`);
            return;
         }

         if (data) {
            console.log('Doctor data inserted:', data);
            alert("Doctor added successfully");

            sendEmail();  // Send email with login credentials

            // Clear form fields after successful submission
            setName('');
            setDesignation('');
            setInfo('');
            setRating('');
            setEmail('');
            setPassword('');
            setImage(null);
            setShowForm(true);
            refreshDoctors();
         }
         else{
            alert("success")
            sendEmail()
         }
      } catch (error) {
         console.error("Error during form submission:", error);
         setFormError("Unexpected error occurred. Please try again.");
      }
   };

   // Email sending logic
   const sendEmail = () => {
      console.log('Attempting to send email...');
      const userTemplateParams = {
         to_email: email,
         name,
         message: `Welcome! Here is your generated password: ${password}`
      };

      emailjs.send('service_bij7amq', 'template_2qsut27', userTemplateParams, 'oNdVP1DnDdfn_f0zA')
         .then(
            (response) => {
               console.log('Email sent successfully:', response);
               alert('Email sent successfully');
            },
            (error) => {
               console.error('Failed to send email:', error);
               alert('Failed to send email. Please check your EmailJS configuration.');
            }
         );
   };


   return (
      <div className='page-create'>
       

        
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
               <input
                  type="text"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
               />

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

               <label htmlFor="image">Image</label>
               <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
               />

               <button type="submit">Submit</button>

               {formError && <p className='error'>{formError}</p>}
            </form>
        
      </div>
   );
};

export default AddDoctor;

