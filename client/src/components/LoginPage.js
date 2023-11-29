import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Login_page.css";

const Loginpage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleloginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData,{
          withCredentials: true,
        }
      );

      const { message } = response.data;
      const { status } = response;

      // console.log(success)
      if (status === 200) {
        navigate("/");
      } else {
        console.log(message);
        window.alert("Invalid Credentials")
      }
    } catch (error) {
      console.error("Login error", error);

      // Log the specific error response from the server
      if (error.response) {
        console.error("Server error response:", error.response.data);
      }
    }
    setLoginData({
      email: "",
      password: "",
    });
  };

  const handleloginChange = (e) => {
    // console.log(e)
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form method="POST" onSubmit={handleloginSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Enter your Email ....."
          value={loginData.email}
          onChange={handleloginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password ....."
          value={loginData.password}
          onChange={handleloginChange}
          required
        />
        <button type="submit">Login</button>

        {/* <p>
          Not registered yet? <Link to ='/Register'>Register Here</Link>
        </p> */}
      </form>
    </div>
  );
};

export default Loginpage;
