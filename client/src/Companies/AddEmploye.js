import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import validator from "email-validator"; // Import the email-validator library
import zxcvbn from "zxcvbn"; // Import the zxcvbn library
const donotRenderRole="He has all the permission , DO not delete it Donot delete" 



const AddEmploye = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    number:"",
    pinCode:"",
    companyName:"",
    DomainName:"",
    designation:"",

  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const history = useNavigate();


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  const isValidEmail = (email) => {
    if (credentials.email) return validator.validate(email);
    return true;
  };




  const sendRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addstudent",// Here Employee endpoint should be enter
        credentials
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.error === "Email already exists"
      ) {
        setNotification({
          open: true,
          message: "User with this email already exists.",
          severity: "error",
        });
      } else {
        console.error("Error adding user:", error);
        throw error;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      const data = await sendRequest();
      if (data) {
        setNotification({
          open: true,
          message: "User added successfully",
          severity: "success",
        });
        setTimeout(() => {
          history("/welcome");
        }, 2000);
      }
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to add user",
        severity: "error",
      });
      console.error("Error in sendRequest:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box
      className="addStudent"
      style={{ marginLeft: "200px", marginTop: "85px" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Add New Employee</Typography>

        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            value={credentials.name}
            onChange={onChange}
            name="name"
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={credentials.email}
            onChange={onChange}
            name="email"
            required
            error={!isValidEmail(credentials.email)}
            helperText={
              !isValidEmail(credentials.email) ? "Invalid email address" : ""
            }
          />
          <TextField
            label="Company Name"
            variant="outlined"
            margin="normal"
            type="text"
            value={credentials.companyName}
            onChange={onChange}
            name="companyName"
            required
          />
           <TextField
            label="Domain Name"
            variant="outlined"
            margin="normal"
            type="text"
            value={credentials.DomainName}
            onChange={onChange}
            name="DomainName"
            required
          />
           <TextField
            label="Your Designation"
            variant="outlined"
            margin="normal"
            type="text"
            value={credentials.designation}
            onChange={onChange}
            name="designation"
            required
          />
            <TextField
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            type="text"
            value={credentials.number}
            onChange={onChange}
            name="number"
            required
          />
           <TextField
            label="Pin Code"
            variant="outlined"
            margin="normal"
            type="number"
            value={credentials.pinCode}
            onChange={onChange}
            name="pinCode"
            required
          />
         

          <Button variant="contained" type="submit">
            Add Employee
          </Button>
        </Box>
      </form>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEmploye;
