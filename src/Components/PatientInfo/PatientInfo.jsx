import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../DoctorsData/DoctorsData.scss";

const PatientInfo = () => {

  const rows = [
      { id: 1, name: "acer nitro", process: "pending" },
      { id: 2, name: "honey nitro", process: "recovered" },
      { id: 3, name: "acer nitro", process: "rejected" },
      { id: 4, name: "acer nitro", process: "pending" },
      { id: 5, name: "honey nitro", process: "recovered" },
      { id: 6, name: "acer nitro", process: "rejected" },
      { id: 7, name: "acer nitro", process: "pending" },
      { id: 8, name: "acer nitro", process: "recovered" },
      { id: 9, name: "acer nitro", process: "pending" }
  ];

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tablecell'></TableCell>
            <TableCell className='tablecell tablePatient'>Patient Name</TableCell>
            <TableCell className='tablecell viewmore'>viewmore</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell className='tablecell tablename'>{row.name}</TableCell>
              <TableCell
                className={`tablecell tablename ${row.process}`}
              >
                {row.process}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PatientInfo;
