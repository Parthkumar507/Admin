// UserAuthentication.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom"; // Correct import for useNavigate

const UseAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // You can adjust the user object based on your API response
  const navigate = useNavigate();
//   console.log('Hiii111111iiiii')
  useEffect(() => {
    const checkAuthentication = async () => {
      // console.log('Hiiiiiiii')
      try {
        const resp = await axios.get("http://localhost:8000/welcome", {
          withCredentials: true,
        });
          // console.log('resp is ',resp)
        if (resp.status === 404) {
          console.log("111");
          navigate("/login");
        }
        if (resp.status === 200) {
          // console.log("Yes user auth, in react js")
          // console.log("resp.data.user",resp.data.user)
          setAuthenticated(true);
          setUser(resp.data.user);
        } else {
          setAuthenticated(false);
          setUser(null);
          // navigate('/login'); // Correct usage of navigate
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        setAuthenticated(false);
        navigate("/login"); // Correct usage of navigate
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [navigate]);

  if (loading) {
    // You can return a loading indicator here if needed
    return <div>Loading...</div>;
  }

//   return authenticated ? <Outlet /> : <Navigate to="/login" />;
    return { authenticated, user };

};

export default UseAuth;
