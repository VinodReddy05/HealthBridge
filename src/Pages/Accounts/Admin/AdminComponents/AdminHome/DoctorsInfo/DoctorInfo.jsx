import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { supabase } from "../../../../../../utilies/SupaBase";
import './DoctorInfo.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const DoctorInfo = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const { data, error } = await supabase
          .from("DoctorsData")
          .select("*");
        if (error) throw error;

        setDoctors(data || []);
      } catch (err) {
        console.error("Error fetching doctors data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsData();
  }, []);

  return (
    <div className="doctor-info">
      <h2>Doctors List</h2>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="doctor-swiper"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor.id} className="doctor-slide">
              <div className="doctor-card">
                <img
                  src={doctor.image_url || "https://via.placeholder.com/150"}
                  alt={doctor.name}
                  className="doctor-image"
                />
                <h3>{doctor.name}</h3>
                <p>Specialization: {doctor.Designation}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default DoctorInfo;
