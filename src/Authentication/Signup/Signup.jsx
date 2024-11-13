import React, { useState } from 'react'
import { supabase } from '../../utilies/SupaBase'
import { useNavigate } from 'react-router-dom'  // import the useNavigate hook
import './Signup.scss'
import { Link } from 'react-router-dom'
const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    
    const navigate = useNavigate();  
    // console.log(formData);

    const handleChange = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName
                    }
                }
              })



            if (error) throw error;
            console.error("Supabase sign-up error:", error);
            
            alert('Check your email to verify your account.');
            navigate('/');
        } catch (error) {
                alert(error);
            }
        }
    
    return (
        <>
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    name="Fullname"  // Ensure this matches the state field name
                    className="form-input"
                    placeholder="Full Name"
                    onChange={handleChange}
                />
    
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email"
                    onChange={handleChange}
                />
    
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Password"
                    onChange={handleChange}
                />
    
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <p className="login-link">
                Already have an account? <Link to='/login'>Login</Link>
            </p>
        </div>
    </>
);

}

export default Signup
