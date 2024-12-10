import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../../../../utilies/SupaBase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import './widget.scss'
import {  useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './widget.scss';

const Widget = () => {

  const navigate = useNavigate();
  const [location, setLocation] = useState(null); // Null until fetched
  const [medicalShops, setMedicalShops] = useState([]);
  const [userInput, setUserInput] = useState('');
  const mapRef = useRef(null); // Reference for the map instance

  const fetchMedicalShops = async (latitude, longitude) => {
    const url = `https://google-map-places.p.rapidapi.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=pharmacy`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '76f94daec2msh1be8f7ec6937f44p142b11jsnadb58c189c13',
        'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMedicalShops(data.results || []);
    } catch (error) {
      console.error('Error fetching medical shops:', error);
    }
  };



  const initializeMap = (latitude, longitude, navigate) => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude, longitude], 14);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView([latitude, longitude], 14);
    }
  
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });
  
    medicalShops.forEach((shop) => {
      const { lat, lng } = shop.geometry.location;
      const marker = L.marker([lat, lng]).addTo(mapRef.current);
  
      const popupContent = document.createElement('div');
      popupContent.innerHTML = `
        <b>${shop.name}</b><br>
        ${shop.vicinity}<br>
        <button
          style="background: #007bff; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-top: 5px;"
          id="navigate-${shop.place_id}">
          More Info
        </button>
      `;
  
      popupContent.querySelector(`#navigate-${shop.place_id}`).addEventListener('click', () => {
        const openInGoogleMaps = true; 
  
        if (openInGoogleMaps) {
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
            '_blank'
          );
        } else {
          navigate(`/medical-shop/${shop.place_id}`);
        }
      });
  
      marker.bindPopup(popupContent);
    });
  };
  
  


  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
            fetchMedicalShops(latitude, longitude);
          },
          (error) => {
            console.error('Error fetching location:', error);
            alert('Please allow location access or enter a location manually.');
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    };

    fetchUserLocation();
  }, []); 

  useEffect(() => {
    if (location) {
      initializeMap(location.lat, location.lng, navigate);
    }
  }, [location, medicalShops, navigate]);  

  const handleLocationSearch = () => {
    const geocodeLocation = async (address) => {
      const url = `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&language=en&region=en`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '76f94daec2msh1be8f7ec6937f44p142b11jsnadb58c189c13',
          'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const newLocation = data.results[0].geometry.location;
          setLocation({ lat: newLocation.lat, lng: newLocation.lng });
          fetchMedicalShops(newLocation.lat, newLocation.lng);
        } else {
          alert('Location not found. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching geocoded location:', error);
      }
    };

    if (userInput.trim()) {
      geocodeLocation(userInput);
    } else {
      alert('Please enter a valid location.');
    }
  };

 

    const handleClick = (route) => {
      navigate(route);   
    };

    // ==================================


    const [totalAppointments, setTotalAppointments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalAppointments = async () => {
      const { count, error } = await supabase
        .from('Appointments')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching total appointments:', error);
        setError('Error fetching data');
      } else {
        setTotalAppointments(count);
      }
    };

    fetchTotalAppointments();
  }, []); 


  return (
    <div>
       <div className='widget-patient'>
         <div className="widget-patients">
           <h1>Your Details</h1>
           <p>Hospital patient Dashboard Template</p>
         </div>

         <div className="widgets">
         <div className=" widg-11" onClick={() => handleClick()}>
           <div className="patients" >
             <h3 >Happy Paatients</h3> 
             <h2 style={{color:"white", fontSize:"35px"} }>
             {error ? error : totalAppointments}
        <ShowChartIcon fontSize="large" />
      </h2>
             <h1></h1>
           </div>
           <div className="icon"><FavoriteIcon fontSize="large" /></div>
         </div>
      
         <div className=" widg-33">
           <div className="patient">
             <h3>Total Appointment</h3>
            <h1>76<ShowChartRoundedIcon 
               fontSize="large"
            /> </h1>
          </div>
          <div className="icon"><CalendarMonthIcon fontSize="large" /></div>
        </div>

        </div>
      </div>


      <div className="widget-container">
        <h1>Nearby Medical Shops</h1>
        <input
          type="text"
          placeholder="Enter your location (e.g., city, address)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
         
        />
        <button  onClick={handleLocationSearch}>Search</button>

        <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px', zIndex:"0" }}></div>
      </div>
    </div>
  );
};

export default Widget;
