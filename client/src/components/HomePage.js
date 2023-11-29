// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import '../style/Home_page.css'; // Import the styles


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
