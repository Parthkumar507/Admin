// Layout.js
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from "../Auth/UserAuthentication";


const Layout = ({ children }) => {

  const [user, setUser] = useState(null);
  const location = useLocation();


  const sendRequest = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/welcome", {
        withCredentials: true,
      });

      return resp.data;
    } catch (error) {
      console.log(error);

      // Assuming your server sends a specific status code for unauthorized access
      if (error.response ) {
        // Redirect to login page
        window.location.href = "http://localhost:3000/login";
      }

      // Handle other error cases if needed
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname !== '/login') {
        try {
          const data = await sendRequest();
          setUser(data.user);
        } catch (error) {
          // Handle errors if necessary
          throw error;
        }
      }
    };

    fetchData();
  }, [location.pathname]);

  
  return (
    <div>
      {/* <Header   user={user} /> */}
      {/* <Sidebar /> */}
      {/* {location.pathname !== '/login' && <Sidebar user={user} />} */}
      {/* <Sidebar user={user}/> */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
