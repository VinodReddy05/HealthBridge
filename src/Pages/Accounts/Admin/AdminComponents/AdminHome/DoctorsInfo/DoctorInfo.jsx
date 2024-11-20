import React, { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// Remove the slick carousel imports
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../../../../../utilies/SupaBase";
import './DoctorInfo.scss'

const DoctorInfo = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const { data, error } = await supabase
          .from("DoctorsData")
          .select("*");
        if (error) throw error;

        setDoctors(data || []); // Set fetched doctors data or an empty array
        // console.log(data);
        
      } catch (err) {
        console.error("Error fetching doctors data:", err);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchDoctorsData();
  }, []);

  return (
    <div className="doctor-info">
      <h2>Doctors List</h2>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <div className="doctor-list">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img
                src={doctor.image_url || "https://via.placeholder.com/150"}
                alt={doctor.name}
              />
              <h3>{doctor.name}</h3>
              <p>Specialization: {doctor.Designation}</p> {/* Use correct field name */}
              {/* <button onClick={() => alert(`Viewing ${doctor.name}`)}>
                View Details
              </button>
              <button onClick={() => alert(`Editing ${doctor.name}`)}>
                Edit
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorInfo;
