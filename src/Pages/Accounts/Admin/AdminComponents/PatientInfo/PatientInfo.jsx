import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { supabase } from '../../../../../utilies/SupaBase';
import "./PatientInfo.scss";



const PatientInfo = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('patientsdata')
          .select('id, name, Status');
        if (error) throw error;
        setPatients(data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tablecell">ID</TableCell>
            <TableCell className="tablecell tablePatient">Patient Name</TableCell>
            <TableCell className="tablecell viewmore">
              <Link to="./patients">View More</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.slice(0, 20).map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell className="tablecell tablename">{patient.name}</TableCell>
              <TableCell className={`tablecell tablename ${patient.Status}`}>
                {patient.Status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientInfo;
