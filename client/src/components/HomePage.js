import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Home_page.css';
import useAuth from '../Auth/userAuth';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      callHomePage();
    }
  }, [authenticated]);

  const callHomePage = async () => {
    try {
      const resp = await fetch('/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      console.log("0")
      // if (resp.ok) 
      {
        const data = await resp.json();
        console.log("1")
        console.log(data)

        

        setUserData(data.user);
      }
    } catch (err) {
      setError('An error occurred while fetching user data');
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="sidebar">
      {authenticated && (
        <>
          <h2>Dashboard</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          {userData && (
            <div>
              <h3>User Data</h3>
              <p>Username: {userData.username}</p>
              {/* Display other user data properties as needed */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
