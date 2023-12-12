// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch student data from the API
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`https://example.com/studentdata?page=${page}&pageSize=${pageSize}`);
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  // Update student data on page change
  useEffect(() => {
    fetchStudents();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to the first page when changing page size
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '7%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Student List
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={students}
          columns={[
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
            { field: 'number', headerName: 'Phone Number', flex: 1 },
            // Add more fields as needed
          ]}
          pagination
          pageSize={pageSize}
          page={page}
          rowCount={totalPages * pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </Container>
  );
};

export default StudentList;
