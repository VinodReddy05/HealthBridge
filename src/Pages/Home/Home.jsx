import NavBar from "../../Components/NavBar/NavBar"
import SideBar from "../../Components/SideBar/SideBar"
import "./Home.scss"

import Widget from "./HomeComponents/widgets/Widget";
// import DoctorsData from "../../Components/DoctorsData/DoctorsData";

import Charts from "./HomeComponents/Charts/Charts";
import DoctorsData from "../DoctorsData/DoctorsData/DoctorsData";
import AddDoctor from "../DoctorsData/DoctorsData/AddDoctor";
import PatientInfo from "./HomeComponents/PatientInfo/PatientInfo";
import DoctorInfo from "./HomeComponents/DoctorInfo/DoctorInfo";

const Home = () => {

  return (
    <div className="home">
     <SideBar/>
     <div className="homeconatiner">
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

export default Home
