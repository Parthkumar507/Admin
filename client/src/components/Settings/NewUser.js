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
// const donotRenderRole="He has all the permission , DO not delete it Donot delete" 



const NewUser = () => {
  const [credentials, setCredentials] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
  });
  // const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [roles, setRoles] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Validate email before sending the request
        if (credentials.email && !isValidEmail(credentials.email)) {
          throw new Error("Invalid email address");
        }


        // Fetch roles
        const { data: roles } = await axios.get(
          "http://localhost:8000/api/getRole"
        );
        setRoles(roles);
        console.log("Roles:", roles);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle the error
      }
    };

    fetchData();
  }, [credentials.email,credentials.password]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // const handleTogglePassword = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

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
        "http://localhost:8000/register",
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
        <Typography variant="h3">Add new User</Typography>

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
          <FormControl fullWidth style={{ width: "75%",marginTop:"15px" }}>
            <InputLabel id="role-label">Select a Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              onChange={onChange}
              value={credentials.role}
              variant="outlined"
              placeholder="Select a Role"
              margin="normal"
            >
              {roles.map((role) => (
                role.role !== "admin" && (
                <MenuItem key={role._id} value={role.role}>
                  {role.role}
                </MenuItem>
                )
              ))}
            </Select>
          </FormControl>

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

export default NewUser;
