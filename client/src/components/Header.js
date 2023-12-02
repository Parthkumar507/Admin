import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Header = () => {
  const [value, setValue] = useState();

  return (
    <div style={{display:"div",position:"absolute" ,top:"0"}} >
      <AppBar   >
        <Toolbar>
          <Typography variant="h3">JobPortal</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
                indicatorColor="secondary"
                onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              <Tab to="/login" LinkComponent={Link} label="login" />
              <Tab to="/welcome" LinkComponent={Link} label="Welcome Page" />
              {/* <Tab to="/logout" LinkComponent={Link} label="Logout" /> */}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
