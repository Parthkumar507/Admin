// ProtectedPage.js
import React, { useEffect, useState } from "react";
// import { Typography } from "@mui/material";
// import { hasPermission } from "./permissionsUtil"; // Adjust the import path based on your project structure
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ requiredPermission, children }) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [contentVisible, setContentVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        // let Useridinweb=req.param.userId;
        const response = await axios.get(
            
          "http://localhost:8000/api/fetchpermission/${user._id}}"
        ); // Adjust the URL based on your backend setup
        setUserPermissions(response.data.permissions);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      }
    };

    fetchUserPermissions();
  }, []);

  useEffect(() => {
    // Check if the user has the required permission
    const hasRequiredPermission = (userPermissions, requiredPermission) => {
      return userPermissions.includes(requiredPermission);
    };

    // Update the state to control the visibility of the content
    setContentVisible(hasRequiredPermission);

    // Redirect to the welcome page if the user does not have the required permission
    if (!hasRequiredPermission) {
      navigate("/welcome");
    }
  }, [userPermissions, requiredPermission, navigate]);

  return <>{contentVisible ? children : null}</>;
};

export default ProtectedPage;
