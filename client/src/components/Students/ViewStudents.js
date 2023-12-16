import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('name'); // Default search option is 'name'

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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search option change
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  // Filter students based on search query and option
  const filteredStudents = students.filter((student) => {
    const searchLower = searchQuery.toLowerCase();
    const fieldToSearch = student[searchOption].toLowerCase();

    return fieldToSearch.includes(searchLower);
  });

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
      
      <div className='SearchDiv' style={{display:"flex"}}>

      <div style={{width:"30%"}}>
        <FormControl fullWidth margin="normal">
        <InputLabel id="search-option-label">Search Option</InputLabel>
        <Select
          labelId="search-option-label"
          id="search-option"
          value={searchOption}
          onChange={handleSearchOptionChange}
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="number">Phone Number</MenuItem>
        </Select>
      </FormControl>
      </div>
      
      <TextField
        label={`Search by ${searchOption}`}
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
       </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredStudents}
          columns={[
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
            { field: 'number', headerName: 'Phone Number', flex: 1 },
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
