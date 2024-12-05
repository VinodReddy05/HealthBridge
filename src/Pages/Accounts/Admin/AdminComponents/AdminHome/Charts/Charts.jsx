// import React, { useEffect, useState } from 'react';
// import {LineChart, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, Line } from 'recharts';
// import { supabase } from '../../../../../../utilies/SupaBase'; // Adjust path as needed
// import './Charts.scss';

// const Charts = () => {
//     const [selectedYear, setSelectedYear] = useState('2024'); // Default year
//     const [data2, setData2] = useState([]); // Dynamically fetched data for BarChart
//     const [loading, setLoading] = useState(true); // Loading state
//     const years = ['2022', '2023', '2024', '2025', '2026']; // Add more years as needed

//     const handleYearChange = (event) => {
//         setSelectedYear(event.target.value);
//     };

//     const data = [
//         { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
//         { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
//         { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
//         { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
//         { name: "May", uv: 1890, pv: 4800, amt: 2181 },
//         { name: "June", uv: 2390, pv: 3800, amt: 2500 },
//         { name: "July", uv: 3490, pv: 4300, amt: 2100 }
//     ];

//     const tooltipFormatter = (value, name) => {
//         let label = '';
//         if (name === 'uv') label = 'Recovered Patients';
//         else if (name === 'pv') label = 'New Patients';
//         return [value, label];
//     };

//     useEffect(() => {
//         const fetchChartData = async () => {
//             setLoading(true); // Set loading to true
//             try {
//                 // Fetch data from Supabase
//                 const { data, error } = await supabase
//                     .from('patientsdata')
//                     .select('created_at, Status'); // Adjust fields based on your schema
//                 if (error) throw error;

//                 // Filter data by the selected year
//                 const filteredData = data.filter((entry) => {
//                     const year = new Date(entry.created_at).getFullYear();
//                     return year.toString() === selectedYear;
//                 });

//                 // Prepare monthly data
//                 const monthlyData = Array(12).fill(0).map((_, index) => ({
//                     name: new Date(0, index).toLocaleString('default', { month: 'short' }),
//                     uv: 0, // Recovered Patients
//                     pv: 0, // New Patients
//                 }));

//                 // Populate monthlyData based on Supabase data
//                 filteredData.forEach((entry) => {
//                     const month = new Date(entry.created_at).getMonth(); // Get month index
//                     if (entry.Status === 'recovered') {
//                         monthlyData[month].uv += 1;
//                     } else if (entry.Status === 'new') {
//                         monthlyData[month].pv += 1;
//                     }
//                 });

//                 setData2(monthlyData);
//             } catch (err) {
//                 console.error('Error fetching chart data:', err);
//             } finally {
//                 setLoading(false); // Stop loading
//             }
//         };

//         fetchChartData();
//     }, [selectedYear]); // Re-fetch data when selectedYear changes

//     return (
//         <div className='chart'>
//             <div className="chart-12">
//                 <div className="main-heading">
//                     <div className="heading">
//                         <h3> Patient Statistics</h3>
//                     </div>
//                     <div className="year-dropdown">
//                         <select value={selectedYear} onChange={handleYearChange} className="custom-dropdown">
//                             {years.map((year) => (
//                                 <option key={year} value={year}>
//                                     {year}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <BarChart width={600} height={450} data={data2}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip formatter={(value, name) => [value, name === 'uv' ? 'Recovered Patients' : 'New Patients']} />
//                         <Legend />
//                         <Bar dataKey="pv" fill="#D45BFF" name="New Patients" />
//                         <Bar dataKey="uv" fill="#369DC9" name="Recovered Patients" />
//                     </BarChart>
//                 )}
//             </div>

//             <div className="chart-11">
//                 <div className="main-heading">
//                     <div className="heading">
//                         <h3>Revenue</h3>
//                     </div>
//                     <div className="months">
//                         <p>Monthly</p>
//                         <p>Weekly</p>
//                         <p>Today</p>
//                     </div>
//                 </div>
//                 <LineChart width={700} height={450} data={data}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip formatter={tooltipFormatter} />
//                     <Legend />
//                     <Line type="monotone" dataKey="pv" stroke="green" name="New Patients" />
//                     <Line type="monotone" dataKey="uv" stroke="red" name="Recovered Patients" />
//                 </LineChart>
//             </div>
//         </div>
//     );
// };

// export default Charts;



import React, { useEffect, useState } from 'react';
import {
  LineChart,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { supabase } from '../../../../../../utilies/SupaBase'; // Adjust path as needed
import './Charts.scss';

const Charts = () => {
  const [selectedYear, setSelectedYear] = useState('2024'); // Default year
  const [data2, setData2] = useState([]); // Dynamically fetched data for BarChart
  const [loading, setLoading] = useState(true); // Loading state
  const years = ['2022', '2023', '2024', '2025', '2026']; // Add more years as needed

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
  ];

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true); // Set loading to true
      try {
        const { data, error } = await supabase
          .from('patientsdata')
          .select('created_at, Status');
        if (error) throw error;

        const filteredData = data.filter((entry) => {
          const year = new Date(entry.created_at).getFullYear();
          return year.toString() === selectedYear;
        });

        const monthlyData = Array(12)
          .fill(0)
          .map((_, index) => ({
            name: new Date(0, index).toLocaleString('default', { month: 'short' }),
            uv: 0, // Recovered Patients
            pv: 0, // New Patients
          }));

        filteredData.forEach((entry) => {
          const month = new Date(entry.created_at).getMonth();
          if (entry.Status === 'recovered') {
            monthlyData[month].uv += 1;
          } else if (entry.Status === 'new') {
            monthlyData[month].pv += 1;
          }
        });

        setData2(monthlyData);
      } catch (err) {
        console.error('Error fetching chart data:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchChartData();
  }, [selectedYear]);

  return (
    <div className="chart">
      <div className="chart-12">
        <div className="main-heading">
          <div className="heading">
            <h3> Patient Statistics</h3>
          </div>
          <div className="year-dropdown">
            <select value={selectedYear} onChange={handleYearChange} className="custom-dropdown">
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="95%" height={450}>
            <BarChart data={data2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [value, name === 'uv' ? 'Recovered Patients' : 'New Patients']} />
              <Legend />
              <Bar dataKey="pv" fill="#D45BFF" name="New Patients" />
              <Bar dataKey="uv" fill="#369DC9" name="Recovered Patients" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="chart-11">
        <div className="main-heading">
          <div className="heading">
            <h3>Revenue</h3>
          </div>
          <div className="months">
            <p>Monthly</p>
            <p>Weekly</p>
            <p>Today</p>
          </div>
        </div>
        <ResponsiveContainer width="95%" height={450}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name) => [value, name === 'uv' ? 'Recovered Patients' : 'New Patients']} />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="green" name="New Patients" />
            <Line type="monotone" dataKey="uv" stroke="red" name="Recovered Patients" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
