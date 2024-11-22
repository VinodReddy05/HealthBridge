import { useEffect, useState } from "react";
import { supabase } from '../../../../../../utilies/SupaBase';
import DoctorCard from "../DoctorCard/DoctorCard";
// import AddDoctor from "./AddDoctor";

import "./DoctorsData.scss";
import { useNavigate } from "react-router-dom";
import SideBar from "../../SiderBar/SideBar";

const DoctorsData = () => {

    const navigate = useNavigate()

    const [fetchError, setFetchError] = useState(null);
    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {

        const { data, error } = await supabase
            .from('DoctorsData')
            .select();
        if (error) {
            // console.error("Error fetching data:", error);
            setFetchError("Could not fetch data");
            setDoctors([]);
        } else {

            console.log("Fetched doctors data:", data);
            setDoctors(data);
            setFetchError(null);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);


    const handleClick =()=>{
        navigate('/Doctors/new')
    }

    return (
        <div className="DoctorsData">
            {/* <AddDoctor refreshDoctors={fetchDoctors} /> */}
            <button onClick={handleClick}>add Doctor</button>
            <div className="doctorFetch">
                {fetchError && <p>{fetchError}</p>}
                {doctors && (
                 
                        <div className="doctors-grid">
                            {doctors.map(doctor => (
                                <DoctorCard key={doctor.id || index} doctor={doctor} />
                            ))}
                        </div>
                
                )}
            </div>
        </div>
    );
};

export default DoctorsData;





