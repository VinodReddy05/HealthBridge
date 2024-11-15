import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicationIcon from '@mui/icons-material/Medication';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import './widget.scss'
import { Route, useNavigate } from 'react-router-dom';

const Widget = () => {  
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);   
  };
  return (
    <div>
      <div className='widget-container'>
        <div className="widget-heading">
          <h1>Welcome to Eres!</h1>
          <p>Hospital Admin Dashboard Template</p>
        </div>

        <div className="widget">
        <div className=" widg-1" onClick={() => handleClick('/patients')}>
          <div className="patient" >
            <h3 >Total Patients</h3> 
            <h1>723 <ShowChartIcon fontSize="large" /></h1>
          </div>
          <div className="icon"><FavoriteIcon fontSize="large" /></div>
        </div>
        <div className=" widg-2" onClick={() => handleClick('/Doctors')}>
          <div className="patient">
            <h3>Doctor</h3>
            <h1>84 <ShowChartRoundedIcon 
              style={{ transform: 'rotate(70deg)' }} fontSize="large"
            /> <span>-4</span></h1> 
          </div><span>-4</span>
          <div className="icon"><MedicationIcon fontSize="large" /></div>
        </div>
        <div className=" widg-3">
          <div className="patient">
            <h3>Appointment</h3>
            <h1>76<ShowChartRoundedIcon 
              style={{ transform: 'rotate(70deg)' }} fontSize="large"
            /> </h1>
          </div>
          <div className="icon"><CalendarMonthIcon fontSize="large" /></div>
        </div>
        <div className=" widg-4">
          <div className="patient">
            <h3>Hospital Earning</h3>
            <h1>$56k <ShowChartIcon fontSize="large" /></h1>
          </div>
          <div className="icon"><CurrencyRupeeIcon fontSize="large" /></div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Widget;  