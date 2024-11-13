import NavBar from "../../../Components/NavBar/NavBar"
import SideBar from "./AdminComponents/SiderBar/SideBar"
import "./Admin.scss"
import Widget from "./AdminComponents/AdminHome/widgets/Widget";
import Charts from "./AdminComponents/AdminHome/Charts/Charts";
import DoctorInfo from "./AdminComponents/AdminHome/DoctorsInfo/DoctorInfo";

const Admin = () => {

  return (
    <div className="admin">
     <SideBar/>
     <div className="adminconatiner">
      <NavBar/>
      <div className="widgets">
      <Widget/>
        </div>   
        <div className="charts">
        <Charts/>
        </div>
        <div className="doctors">
          <DoctorInfo/>
        
        </div>
      </div>
  
     </div>

  )
}

export default Admin
