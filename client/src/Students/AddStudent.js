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



const AddStudent = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    number:"",
    age:"",
    link:""
  });
  // const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

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

  const isValidPassword = (password) => {
    // Use zxcvbn to estimate password strength
    // const result = zxcvbn(password);

    // Password is considered valid if the score is 3 or higher (adjust as needed)
    // return result.score >= 2;

    return password.length >= 8; 
  };


  const sendRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addstudent",// Here Student endpoint should be enter
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

         // Validate password before sending the request
      if (credentials.password && !isValidPassword(credentials.password)) {
        setNotification({
          open: true,
          message: "Weak password. Please enter more than 8 letters.",
          severity: "error",
        });
        return;
      }

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
        <Typography variant="h3">Add New Student</Typography>

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
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={credentials.password}
            onChange={onChange}
            name="password"
            required
          />
            <TextField
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            type="number"
            value={credentials.number}
            onChange={onChange}
            name="number"
            required
          />
           <TextField
            label="Video Link"
            variant="outlined"
            margin="normal"
            type="text"
            value={credentials.link}
            onChange={onChange}
            name="link"
            required
          />
           <TextField
            label="Age"
            variant="outlined"
            margin="normal"
            type="number"
            value={credentials.age}
            onChange={onChange}
            name="age"
            required
          />
         

          <Button variant="contained" type="submit">
            Add User
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

export default AddStudent;
