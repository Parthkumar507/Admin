import React, { useState, memo } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  const [value, setValue] = useState();

  const dynamicLogin = () => {
    if (user !== null) {
      return <Tab label={`Hello, ${user.name}`} />;
    } else {
      return <Tab component={Link} to="/login" label="Login" />;
    }
    
  };

  return (
    <div style={{ display: "div", position: "absolute", top: "0" }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h3">JobPortal</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {dynamicLogin()}
              <Tab component={Link} to="/welcome" label="Welcome Page" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(Header, (prevProps, nextProps) => {
  // Custom comparison function to prevent re-rendering when user prop changes
  return (
    prevProps.user && nextProps.user && prevProps.user.name === nextProps.user.name
  );
});
