import NavBar from "../../Components/NavBar/NavBar"
import SideBar from "../../Components/SideBar/SideBar"
import "./Home.scss"

import Widget from "./HomeComponents/widgets/Widget";
// import DoctorsData from "../../Components/DoctorsData/DoctorsData";

import Charts from "./HomeComponents/Charts/Charts";
import DoctorsData from "./HomeComponents/DoctorsData/DoctorsData";
import AddDoctor from "./HomeComponents/DoctorsData/AddDoctor";

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
          <AddDoctor/>
          <DoctorsData/>
        </div>
      </div>
  
     </div>

  )
}

export default Home
