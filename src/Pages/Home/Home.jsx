import NavBar from "../../Components/NavBar/NavBar"
import SideBar from "../../Components/SideBar/SideBar"
import "./Home.scss"
import Widget from "../../Components/widgets/widget";
import Charts from "../../Components/Charts/Charts";
import DoctorsData from "../../Components/DoctorsData/DoctorsData";
import AddDoctor from "../../Components/DoctorsData/AddDoctor";

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
