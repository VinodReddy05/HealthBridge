import React from "react";
import image from './assets/footerImg.svg'
import './Footer.scss'

const Footer = () => {
  return (
<>

<div className="footer">

<div className="footer-data">
    
<div  className="footer-info">
            <h2>Patient Care</h2>
            <p>Find A Doctor</p>
            <p>Patient Testimonials</p>
            <p>Pay Online</p>
            <p>Physiotherapy</p>
            <p>Emergency Medicine</p>
            <p>Health Care Staffing</p>
            <p>Watch our Videos</p>
        </div>

        <div className="footer-info">
        <h2>Medical Procedures</h2>
            <p>Bariatric Surgery</p>
            <p>Brain Surgeries</p>
            <p>Cardiac Pacemakers</p>
            <p>Colorectal Surgeries</p>
            <p>Endometriosis</p>
            <p>EHead and Neck Cancer</p>
            <p></p>
        </div>

        <div className="footer-info">
        <h2>Contact Us</h2>
            <p>Post A Query</p>
            <p>Consult Doctors Online</p>
            <p>Book Physical Appointment</p>
            <p>Give Your Feedback</p>
            <p>Apollo Lifeline</p>
            <p>Our Stents Pricing</p>
            <p>Total Knee Replacement Implants Pricing</p>
        </div>

</div>
    </div>
<div className="footer-bottom">
<p>&#169; Copyright 2024-2025</p>
    
</div>
</>
  );
};

export default Footer;
