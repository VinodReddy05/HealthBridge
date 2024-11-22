import React, { useState,useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import './widget.scss'
import { supabase } from '../../../../../../utilies/SupaBase';

const Widget = () => {  


  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDotors, setTotaldoctors] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTotalPatients = async () => {
      try {
        const { count: patientCount, error: patientError } = await supabase
          .from("patientsdata")
          .select("*", { count: 'exact', head: true });  
  
        if (patientError) throw patientError;
  
        setTotalPatients(patientCount  || 0);  
        console.log("Total Patients:", patientCount);

        const { count: doctorCount, error: doctorError } = await supabase
        .from("DoctorsData")  
        .select("*", { count: 'exact', head: true });  

      if (doctorError) throw doctorError;
      setTotaldoctors(doctorCount || 0);  
      console.log("Total Doctors:", doctorCount);

      } catch (err) {
        console.error("Error fetching total patients:", err);
      } finally {
        setLoading(false);  
      }
    };
  
    fetchTotalPatients();
  }, []);

  return (
    <div>
      <div className='widget-containers'>
        <div className="widget-headings">
          <h1>Doctors</h1>
          <p>Hospital doctor Dashboard Template</p>
        </div>

        <div className="widgets">
        <div className=" widg-11" onClick={() => handleClick('/patients')}>
          <div className="patients" >
            <h3 >Total Patients</h3> 
            <h1>{totalPatients} <ShowChartIcon fontSize="large" /></h1>
          </div>
          <div className="icon"><FavoriteIcon fontSize="large" /></div>
        </div>
      
        <div className=" widg-33">
          <div className="patient">
            <h3>Appointment</h3>
            <h1>76<ShowChartRoundedIcon 
              style={{ transform: 'rotate(70deg)' }} fontSize="large"
            /> </h1>
          </div>
          <div className="icon"><CalendarMonthIcon fontSize="large" /></div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default Widget;  