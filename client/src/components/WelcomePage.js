import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Import your Sidebar component
axios.defaults.withCredentials = true;

const WelcomePage = () => {
  // const [user, setUser] = useState();

  // const sendRequest = async () => {
  //   try {
  //     const resp = await axios.get("http://localhost:8000/welcome", {
  //       withCredentials: true,
  //     });

  //     return resp.data;
  //   } catch (error) {
  //     console.log(error);

  //     // Assuming your server sends a specific status code for unauthorized access
  //     if (error.response) {
  //       // Redirect to login page
  //       window.location.href = "http://localhost:3000/login";
  //     }

  //     // Handle other error cases if needed
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   sendRequest()
  //     .then((data) => setUser(data.user))
  //     .catch((error) => {
  //       // Handle errors if necessary
  //     });
  // }, []);

  return (
    <div>
      {/* <Sidebar user={user} />  */}
       {/* <div>Welcome {user && <h1>{user.name}</h1>}</div> */}
    </div>
  );
};

export default WelcomePage;
