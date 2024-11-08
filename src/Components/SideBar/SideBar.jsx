import "./SideBar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Person3Icon from '@mui/icons-material/Person3';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">ERES</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title"> Main</p>
          <li>
          <DashboardIcon/>
            <span>Dashboard</span>
          </li>
          <p className="title"> Patient Details</p>
          <li>
            <AccessibleIcon/>
            <span>Patients</span>
          </li>
          <p className="title"> Staf</p>
          <li>
            <PersonSharpIcon/>
            <span>Doctors</span>
          </li>
          <li>
          <Person3Icon/>
          <span>Nurse</span>
          </li>

          <p className="title">Check List</p>
          <li>
            <ChecklistRtlIcon/>
            <span>Appointments</span> 
          </li>
          <li>
            <AccessTimeIcon/>
            <span>Appointment Schdule</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
