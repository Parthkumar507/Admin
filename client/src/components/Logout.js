import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./Auth/UserAuthentication";
import { Box, Button } from "@mui/material";

const Logout = () => {
  // console.log('Logoutttttttttttt')
  const navigate = useNavigate();
  const { authenticated } = UseAuth();

  const handleLogout = async () => {
    try {
      if (authenticated) {
        // Make a request to the backend to log out
        await axios.post("http://localhost:8000/logout", {
          // You might include additional data in the request body if needed
        });

        // Assuming successful logout, update the authentication state
        // You may clear user data, update state, or perform any necessary cleanup
        // ...

        // Redirect the user to the login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle errors if necessary
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Adjust this value to center vertically within the viewport
    >
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};


export default Logout;
