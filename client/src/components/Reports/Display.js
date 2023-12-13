import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Button, styled, Snackbar, Alert } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./Display.css"


const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
//   marginTop: theme => theme.spacing(40),
marginTop:"7%",
marginLeft:"7%"
});

const StudentReport = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const pageSize = 10; // Adjust page size as needed

  useEffect(() => {
    // Fetch all student reports
    // Replace this URL with the correct API endpoint that provides all student reports
    fetch('https://example.com/allstudentreports')
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => {
        console.error('Error fetching student reports:', error)
        showSnackbar('Error fetching student reports', 'error');
    });
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const StyledButton = styled(Button)({
    marginTop: theme => theme.spacing(1),
  });

  // Paginate the reports on the client side
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedReports = reports.slice(startIndex, startIndex + pageSize);

  const columns = [
    { field: 'Id', headerName: 'Reports ID', width:"100",headerClassName: 'customHeader1'},
    { field: 'name', headerName: 'Name', width:"500",headerClassName: 'customHeader2' }
    // { field: 'grade', headerName: 'Grade', width: 150 },
    // Add more columns as needed
  ];
  // Snackbar functions
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
const handleExportToPDF = () => {
    const gridContainer = document.getElementById('grid-container');

    if (gridContainer) {
        if (gridContainer.childNodes.length === 0) {
            console.log('Data Set is empty');
            showSnackbar('Data Set is empty', 'fail');
            return;
          }
      
      html2canvas(gridContainer).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('report.pdf');
        showSnackbar('PDF exported successfully', 'success');
      });
    }else {
        console.log('Grid container not found');
        showSnackbar('Grid container not found', 'error');
      }
  };


  return (
    <StyledDiv>
      <h1>Student Reports</h1>
      <div style={{ height: 400, width: '70%', marginTop: 16 }}>
        <DataGrid
          rows={paginatedReports}
          columns={columns}
          pageSize={pageSize}
          checkboxSelection
        />
      </div>
      <div style={{display:"flex",flexDirection:"row"}}>

     
      <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous Page</Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>Next Page</Button>
      </div>
      <StyledButton onClick={handleExportToPDF} sx={{ marginTop: 2, backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'} }}>Export to PDF</StyledButton>
          {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}  anchorOrigin={{ vertical: 'down', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </StyledDiv>
  );
};

export default StudentReport;
