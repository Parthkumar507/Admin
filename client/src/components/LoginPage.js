import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    // console.log("`````````res`````````" , res)
    const data = await res.data;
    // console.log("`````````data`````````" , data)
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest().then(() => history("/welcome"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Login</Typography>
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginPage;













































// import React, { useState  } from "react";
// import {  useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../style/Login_page.css";

// const Loginpage = () => {
//   const navigate = useNavigate();
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });


//   const handleloginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/login",
//         loginData,{
//           withCredentials: true,
//         }
//       );
        
//       const { message } = response.data;
//       const { status } = response;

//       // console.log(success)
//       if (status === 200) {

//         navigate("/");
//       } else {
//         console.log(message);
//         // window.alert("Invalid Credentials")
//       }
//     } catch (error) {
//       console.error("Login error", error);

//       // Log the specific error response from the server
//       if (error.response) {
//         console.error("Server error response:", error.response.data);
//       }
//     }
//     setLoginData({
//       email: "",
//       password: "",
//     });
//   };

//   const handleloginChange = (e) => {
//     // console.log(e)
//     const { name, value } = e.target;
//     setLoginData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="container">
//       <h1>Login Page</h1>
//       <form method="POST" onSubmit={handleloginSubmit}>
//         <input
//           type="text"
//           name="email"
//           placeholder="Enter your Email ....."
//           value={loginData.email}
//           onChange={handleloginChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter your password ....."
//           value={loginData.password}
//           onChange={handleloginChange}
//           required
//         />
//         <button type="submit">Login</button>

//         {/* <p>
//           Not registered yet? <Link to ='/Register'>Register Here</Link>
//         </p> */}
//       </form>
//     </div>
//   );
// };

// export default Loginpage;
