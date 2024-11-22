import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, PieChart, Tooltip, XAxis, YAxis, } from 'recharts';
import './Charts.scss';

const Charts = () => {
    const [selectedYear, setSelectedYear] = useState('2024'); // Default year
    const years = ['2022', '2023', '2024', '2025', '2026']; // Add more years as needed

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const data = [
        { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Feb", uv: 3000, pv: 140, amt: 2210 },
        { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
        { name: "May", uv: 1890, pv: 4800, amt: 2181 },
        { name: "June", uv: 2390, pv: 3800, amt: 2500 },
        { name: "July", uv: 3490, pv: 4300, amt: 2100 },
        { name: "Aug", uv: 3490, pv: 4300, amt: 2100 },
        { name: "Sep", uv: 3490, pv: 6000, amt: 2100 },
        { name: "Oct", uv: 3490, pv: 4300, amt: 2100 },
        { name: "Nov", uv: 3490, pv: 4300, amt: 2100 },
        { name: "Dec", uv: 3490, pv: 4300, amt: 2100 }
    ];

    const data2 = [
        { name: "Jan", uv: 4000, pv: 2400 },
        { name: "Feb", uv: 3000, pv: 140 },
        { name: "Mar", uv: 2000, pv: 9800 },
        { name: "Apr", uv: 2780, pv: 3908 },
        { name: "May", uv: 1890, pv: 4800 },
        { name: "June", uv: 2390, pv: 3800 },
        { name: "July", uv: 3490, pv: 4300 }
    ];

    const tooltipFormatter = (value, name) => {
        let label = '';
        if (name === 'uv') label = 'Recovered Patients';
        else if (name === 'pv') label = 'New Patients';
        return [value, label];
    };

    return (
        <div className='chart'>
            <div className="chart-2">
            <div className="main-heading">
                    <div className="heading">
                        <h3>Revenue</h3>
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
                <BarChart width={600} height={450} data={data2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={tooltipFormatter} />
                    <Legend />
                    <Bar dataKey="pv" fill="#D45BFF" name="New Patients" />
                    <Bar dataKey="uv" fill="#369DC9" name="Recovered Patients" />
                </BarChart>
            </div>
            <div className="chart-1">
                <div className="main-heading">
                    <div className="heading">
                        <h3>Patient Statistics</h3>
                    </div>
                    <div className="months">
                        <p>Monthly</p>
                        <p>Weekly</p>
                        <p>Today</p>
                    </div>
                </div>
                {/* <LineChart width={700} height={450} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={tooltipFormatter} />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="green" name="New Patients" />
                    <Line type="monotone" dataKey="uv" stroke="red" name="Recovered Patients" />
                </LineChart> */}
            </div>
    


        </div>
    );
};

export default Charts;
