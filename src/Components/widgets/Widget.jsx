import React from 'react'
import "./widget.scss"
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicationIcon from '@mui/icons-material/Medication';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';

const Widget = () => {  
  return (
    <div>
      <div className='widget-container'>
        <div className="widget-heading">
          <h1>Welcome to Eres!</h1>
          <p>Hospital Admin Dashboard Template</p>
        </div>

        <div className="widget">
        <div className=" widg-1">
          <div className="patient">
            <h3>Total Patients</h3> 
            <h1>723 <ShowChartIcon fontSize="large" /></h1>
          </div>
          <div className="icon"><FavoriteIcon fontSize="large" /></div>
        </div>
        <div className=" widg-2">
          <div className="patient">
            <h3>Total Patients</h3>
            <h1>723 <ShowChartRoundedIcon 
              style={{ transform: 'rotate(70deg)' }} fontSize="large"
            /> </h1>
          </div>
          <div className="icon"><MedicationIcon fontSize="large" /></div>
        </div>
        <div className=" widg-3">
          <div className="patient">
            <h3>Total Patients</h3>
            <h1>723 <ShowChartRoundedIcon 
              style={{ transform: 'rotate(70deg)' }} fontSize="large"
            /> </h1>
          </div>
          <div className="icon"><CalendarMonthIcon fontSize="large" /></div>
        </div>
        <div className=" widg-4">
          <div className="patient">
            <h3>Total Patients</h3>
            <h1>723 <ShowChartIcon fontSize="large" /></h1>
          </div>
          <div className="icon"><CurrencyRupeeIcon fontSize="large" /></div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Widget;  