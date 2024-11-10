import React, { useState } from 'react';
import {supabase} from "../../../utilies/SupaBase"


const AddDoctor = () => {
    
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [info, setInfo] = useState('');
    const [rating, setRating] = useState('');
    const [formError, setFormError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trim and validate input fields
        const trimmedName = name.trim();
        const trimmedDesignation = designation.trim();
        const trimmedInfo = info.trim();
        const trimmedRating = rating.trim();

        console.log('Form values before submit:', { trimmedName, trimmedDesignation, trimmedInfo, trimmedRating });

        if (!trimmedName || !trimmedDesignation || !trimmedInfo || !trimmedRating) {
            setFormError("Please fill out the form correctly.");
            console.log("Form Error: Fields are empty.");
            return;
        }

        // Convert rating to number and validate
        const parsedRating = Number(trimmedRating);
        if (isNaN(parsedRating)) {
            setFormError("Rating must be a valid number.");
            console.log("Form Error: Invalid rating");
            return;
        }

        setFormError('');
        console.log("Submitting form with data:", { name: trimmedName, designation: trimmedDesignation, info: trimmedInfo, rating: parsedRating });

        const { data, error } = await supabase
        .from('DoctorsData')
        .insert([{ 
            name: trimmedName, 
            Designation: trimmedDesignation, // Notice the uppercase "D"
            info: trimmedInfo, 
            rating: parsedRating 
        }]);

if (error) {
    console.error("Supabase Error Details:", error.message); // More specific error logging
    setFormError("There was an issue submitting the form.");
    return;
}

        if (data) {
            console.log("Data submitted successfully:", data);
            setFormError(null);
            // Reset form fields
            setName('');
            setDesignation('');
            setInfo('');
            setRating('');
        }
    };

    return (
        <div className='page-create'>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Hide Form' : 'Add a Doctor'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="designation">Designation</label>
                    <input
                        type="text"
                        id="designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    />

                    <label htmlFor="info">Info</label>
                    <textarea
                        id="info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />

                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />

                    <button type="submit">Submit</button>

                    {formError && <p className='error'>{formError}</p>}
                </form>
            )}
        </div>
    );
};

export default AddDoctor;
