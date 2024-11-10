import PatientInfo from '../PatientInfo/PatientInfo'
import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, IconButton, Rating, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import "./DoctorInfo.scss"
import img1 from './assetsDoctors/doctor1.svg'
import img2 from './assetsDoctors/doctor2.svg'
import img3 from './assetsDoctors/doctor3.svg'
import img4 from './assetsDoctors/doctor4.svg'
import img5 from './assetsDoctors/doctor5.svg'
import img6 from './assetsDoctors/doctor6.svg'
import img8 from './assetsDoctors/doctor7.svg'
import img7 from './assetsDoctors/doctor8.svg'

const doctorsData = [
    { id: 1, name: "Dr. John Doe", profession: "Surgeon", rating: 4, about: "Expert in heart surgeries. Has over 10 years of experience.", img: img1, social: { facebook: "#", instagram: "#", twitter: "#" } },
    { id: 2, name: "Dr. Jane Smith", profession: "Pediatrician", rating: 5, about: "Specializes in children's health, providing the best care.", img: img2, social: { facebook: "#", instagram: "#", twitter: "#" } },
    { id: 3, name: "Dr. Michael Brown", profession: "Dermatologist", rating: 4, about: "Skilled in treating skin conditions, known for innovative treatments.", img: img3, social: { facebook: "#", instagram: "#", twitter: "#" } },
    { id: 4, name: "Dr. Sarah Lee", profession: "Neurologist", rating: 5, about: "Recognized for her expertise in neurology and brain health.", img: img4, social: { facebook: "#", instagram: "#", twitter: "#" } },
    { id: 5, name: "Dr. David King", profession: "Orthopedic", rating: 4.5, about: "Known for treating sports injuries with advanced techniques.", img: img5, social: { facebook: "#", instagram: "#", twitter: "#" } },
    { id: 6, name: "Dr. Emma Taylor", profession: "Cardiologist", rating: 5, about: "Highly experienced in diagnosing and treating heart conditions.", img: img6, social: { facebook: "#", instagram: "#", twitter: "#" } },
    { id: 7, name: "Dr. Liam Wilson", profession: "General Practitioner", rating: 3.5, about: "Offers general health check-ups with personalized care.", img: img7, social: { facebook: "#", instagram: "#", twitter: "#" } },
    { id: 8, name: "Dr. Olivia Martinez", profession: "Psychiatrist", rating: 4, about: "Specializes in mental health and well-being.", img: img8, social: { facebook: "#", instagram: "#", twitter: "#" } },
];

const DoctorInfo = () => {
    return (
        <div className='DoctorInfo'>
            <Grid container spacing={4}>
                {doctorsData.map((doctor) => (
                    <Grid item xs={16} sm={6} md={3} key={doctor.id}>
                        <Card>
                            <CardMedia
                                component="img"
                               width="140"
                                height="250"
                                image={doctor.img}
                                alt={doctor.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {doctor.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {doctor.profession}
                                </Typography>
                                <Rating name="read-only" value={doctor.rating} readOnly />
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {doctor.about}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton href={doctor.social.facebook} target="_blank">
                                    <Facebook />
                                </IconButton>
                                <IconButton href={doctor.social.instagram} target="_blank">
                                    <Instagram />
                                </IconButton>
                                <IconButton href={doctor.social.twitter} target="_blank">
                                    <Twitter />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <div className="patientDIV">
                <PatientInfo />
            </div>

        </div>
    );
};

export default DoctorInfo
