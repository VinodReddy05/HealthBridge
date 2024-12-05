import React, { useState, useEffect } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import './Charts.scss';
import { supabase } from '../../../../../../utilies/SupaBase';

const Charts = () => {
    const [selectedYear, setSelectedYear] = useState('2024'); // Default year
    const [data2, setData2] = useState([]); // Dynamically fetched data for BarChart
    const [loading, setLoading] = useState(true); // Loading state
    const years = ['2022', '2023', '2024', '2025', '2026']; // Add more years as needed

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const data = [
        { name: 'Jan', uv: 4000, pv: 2400 },
        { name: 'Feb', uv: 3000, pv: 140 },
        { name: 'Mar', uv: 2000, pv: 9800 },
        { name: 'Apr', uv: 2780, pv: 3908 },
        { name: 'May', uv: 1890, pv: 4800 },
        { name: 'June', uv: 2390, pv: 3800 },
        { name: 'July', uv: 3490, pv: 4300 },
    ];

    const tooltipFormatter = (value, name) => {
        let label = '';
        if (name === 'uv') label = 'Recovered Patients';
        else if (name === 'pv') label = 'New Patients';
        return [value, label];
    };

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
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
                setLoading(false);
            }
        };

        fetchChartData();
    }, [selectedYear]);

    return (
        <div className="chart">
            <div className="chart-2">
                <div className="main-heading">
                    <div className="heading">
                        <h3>Patient Statistics</h3>
                    </div>
                    <div className="year-dropdown">
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="custom-dropdown"
                        >
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
                    <ResponsiveContainer width="100%" height={400}>
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
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={tooltipFormatter} />
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
