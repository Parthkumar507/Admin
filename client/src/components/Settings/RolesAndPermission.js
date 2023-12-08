import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import ProtectedPage from "../../Auth/ProtectedPage";
import Sidebar from "../Sidebar";

const RolesAndPermission = () => {
  // State to store user information
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [roles, setRoles] = useState([]);
  // const [oselectedRole, setSelectedRole] = useState("");
  // const [existingPermissions, setExistingPermissions] = useState([]);
  const [currentRolePermissions, setCurrentRolePermissions] = useState([]);
  const [currentRole, setCurrentRole] = useState("");

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherPermission, setOtherPermission] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: user } = await axios.get("http://localhost:8000/welcome");
        setUser(user);

        // Fetch roles
        const { data: roles } = await axios.get(
          "http://localhost:8000/api/getRole"
        );
        setRoles(roles);
        console.log("Roles:", roles);

        // Check the initially selected role
        const initialRole = roles.length > 0 ? roles[0].role : "";
        setCurrentRole(initialRole);

        const selectedRoleData = roles.find(
          (role) => role.role === initialRole
        );
        const currentPermissions = selectedRoleData?.permission || [];
        setCurrentRolePermissions(currentPermissions);

        // Set the initial state for inputs
        setInputs((prev) => ({
          ...prev,
          role: initialRole,
          permissions: currentPermissions,
        }));

      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle the error
      }
    };

    fetchData();
    // }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount
    // }, [otherPermission, currentRole]);
  }, []);

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    role: "",
    permissions: [],
  });

  const handleChange = (e) => {
    const selectedRole = e.target.value;
    console.log("e.target.value", e.target.value);
    setCurrentRole(selectedRole);
    console.log("Selected Role:", selectedRole);

    // Fetch permissions for the selected role
    const selectedRoleData = roles.find((role) => role.role === selectedRole);
    console.log("Selected Role Data:", selectedRoleData);

    const currentPermissions = selectedRoleData?.permission || [];
    console.log("Current Permissions:", currentPermissions);

    setCurrentRolePermissions(currentPermissions);

  
      // console.log('inputs.role ',inputs.role)
      // Set the initial state for inputs
      setInputs(
        (prev) => ({
          ...prev,
          role: selectedRole === "Other" ? otherPermission : selectedRole,
          permissions: currentPermissions,
        }));
    

    // If the role is "Other," show the input
    setShowOtherInput(selectedRole === "Other");
  };
  // Add this line to update otherPermission state
  const handleOtherPermissionChange = (e) => {

    const otherPermissionValue = e.target.value;

    setOtherPermission(otherPermissionValue);
    console.log("Otherpermision", otherPermission);
    // const otherPermission = e.target.value;
    // Update the role state when typing in the "Other" input
    // setCurrentRole(e.target.value);
    // Update the state with the input value
    setInputs((prev) => ({
      ...prev,
      role: otherPermission,
    }));

  };

  const handlePermissionChange = (e) => {
    const selectedPermissions = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];
    console.log("selectedPermissions", selectedPermissions);

    // if (selectedPermissions.includes("Other")) {
    //   setShowOtherInput(true);
    // }
    const CurrentPermissionsSet = new Set([...currentRolePermissions]);
    const Ans = new Set();
    console.log("updatedPermisison Set ", CurrentPermissionsSet);
    // Check and update the Set based on selected permissions
    selectedPermissions.forEach((permission) => {
      if (CurrentPermissionsSet.has(permission)) {
        console.log("Add  ", permission);
        Ans.add(permission);
      } else {
        // Add permission if current doesn't have it
        console.log("Delete  ", permission);
        Ans.add(permission);
      }
    });
    console.log("Ans Set final", Ans);

    // Convert the Set back to an array
    const updatedAnsArray = Array.from(Ans);
    // Update state with the selected permissions
    setCurrentRolePermissions(updatedAnsArray);

    setInputs((prev) => ({
      ...prev,
      // permissions: uniquePermissions,
      // permissions: updatedPermissionsArray,
      permissions: updatedAnsArray,
    }));
  };

  const sendRequest = async () => {
    console.log("Request Data:", inputs); // Log the data before sending the request

    try {
      const res = await axios.post("http://localhost:8000/api/addpermission", {
        role: inputs.role,
        permission: inputs.permissions,
      });

      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error adding permission:", error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest().then((data) => {
      // console.log("Role Add 0")
      // console.log(data)
      if (data !== AxiosError) {
        // console.log("Role Add")
        setNotification({
          open: true,
          message: "Permission added successfully",
          severity: "success",
        });
        setTimeout(() => {
          history("/welcome");
        }, 2000);
      } else {
        // Show error message
        setNotification({
          open: true,
          message: "Failed to add permission",
          severity: "error",
        });
      }
    });
  };
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    // <ProtectedPage requiredPermission="settings" userId={userId}>

    <div>
      <Sidebar user={user} />
      {/* <Sidebar  />  */}
      <form style={{ marginTop: "85px" }} onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">Role Update</Typography>
          <FormControl fullWidth>
            <InputLabel id="role-label">Select a Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              onChange={handleChange}
              value={inputs.role}
              variant="outlined"
              placeholder="Select a Role"
              margin="normal"
            >
              {roles.map((role) => (
                <MenuItem key={role._id} value={role.role}>
                  {role.role}
                </MenuItem>
              ))}
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          {showOtherInput && (
            <TextField
              type="text"
              label="Other Role You wish to add"
              variant="outlined"
              margin="normal"
              fullWidth
              value={otherPermission}
              onChange={handleOtherPermissionChange}
            />
          )}

          <p>Which Permissions you want to update</p>
          <FormControl fullWidth>
            <InputLabel id="permissions-label">Permissions</InputLabel>
            <Select
              labelId="permissions-label"
              id="permissions"
              name="permissions"
              multiple
              value={inputs.permissions}
              onChange={handlePermissionChange}
              variant="outlined"
              isClearable
            >
              {currentRolePermissions.map((permission) => (
                <MenuItem
                  key={`selected-${currentRole}-${permission}`}
                  value={permission}
                >
                  {permission}
                </MenuItem>
              ))}
              {roles
                .flatMap((role) => role.permission)
                .filter(
                  (permission) =>
                    !currentRolePermissions.includes(permission) &&
                    !inputs.permissions.includes(permission)
                )
                .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                .map((permission) => (
                  <MenuItem
                    key={`unselected-${currentRole}-${permission}`}
                    value={permission}
                  >
                    {permission}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Add Permission
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
    </div>
    // </ProtectedPage>
  );
};

export default RolesAndPermission;
