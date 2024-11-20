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
      <div className='widget-patient'>
        <div className="widget-patients">
          <h1>Your Details</h1>
          <p>Hospital patient Dashboard Template</p>
        </div>

        <div className="widgets">
        <div className=" widg-11" onClick={() => handleClick('/patients')}>
          <div className="patients" >
            <h3 >Recovery</h3> 
            <h1>723 <ShowChartIcon fontSize="large" /></h1>
          </div>
          <div className="icon"><FavoriteIcon fontSize="large" /></div>
        </div>
      
        <div className=" widg-33">
          <div className="patient">
            <h3>Total Appointment</h3>
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