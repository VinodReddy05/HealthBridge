import NavBar from "../../../Components/NavBar/NavBar"
import "./Admin.scss"
import Widget from "./AdminComponents/AdminHome/widgets/Widget";
import Charts from "../Admin/AdminComponents/AdminHome/Charts/Charts";
import DoctorInfo from "./AdminComponents/AdminHome/DoctorsInfo/DoctorInfo";
import { supabase } from "../../../utilies/SupaBase";
import { useEffect,useState } from "react";
import PatientInfo from "./AdminComponents/PatientInfo/PatientInfo";
import Footer from "../../../Components/Footer/Footer";

const Admin = () => {
  const [showGif, setShowGif] = useState(false);  
  const [gifMessage, setGifMessage] = useState("");  


  return (
    <div className="admin">
      {showGif && (
        <div className="gif-container">
          <img
            src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e47l2mubft6j3ziu9t1qbgvfkfngodcfrx0efthlwlz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Loading..."
          />
          <p>{gifMessage}</p>
        </div>
      )}

      <div className="admincontainer">
        <NavBar />
        <div className="widgets">
          <Widget />
        </div>
        <div className="charts">
          <Charts />
        </div>
        <div className="doctors">
          <div className="doctors-1">
            <DoctorInfo />
          </div>
          <div className="doctors-2">
            <PatientInfo />
          </div>
        </div>
        <div><Footer/></div>
      </div>
    </div>
  );
};

export default Admin;
