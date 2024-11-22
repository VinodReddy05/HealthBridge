import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../utilies/SupaBase";
import './Appointments.scss'
import NavBar from "../../../../../Components/NavBar/NavBar";

const Appointments = () => {
  // const navigate = useNavigate()

  const [fetchError, setFetchError] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from("DoctorsData").select();
    if (error) {
      // console.error("Error fetching data:", error);
      setFetchError("Could not fetch data");
      setDoctors([]);
    } else {
      setDoctors(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  console.log(doctors);

  return (
    <div>
        <NavBar/>
      {fetchError && <p>{fetchError}</p>}
      {doctors && (
        <div className="doctors-card">
          {doctors.map((doctor, index) => (
            <div  key={index} className="doctor-info-card">
              <img src={doctor.image_url} alt="" />
              <p><strong>{doctor.name}</strong></p>
              <p><b>{doctor.Degree}</b></p>
              <p>{doctor.info}</p>
              <button className="appointmentbtn">Get Appointment</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
