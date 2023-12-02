// Sidebar.js
import React, { useState } from "react";

import "../style/sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item) => {
    // Do something when an item is clicked
    console.log(`Selected: ${item}`);
    // You can also close the dropdown after an item is clicked if needed
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = (field) => {
    if (openDropdown === field) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(field);
    }
  };

  return (
    <div className="sidebar">
      <>
        <h2>Dashboard</h2>
        <ul>
          <li>
            <button onClick={toggleDropdown}>Report ▼ </button>
            {isDropdownOpen && (
              <ul className="dropdown-content">
                <li onClick={() => handleItemClick("Item 1")}>Item 1</li>
                <li onClick={() => handleItemClick("Item 2")}>Item 2</li>
                <li onClick={() => handleItemClick("Item 3")}>Item 3</li>
              </ul>
              
            )}
            {/* <span onClick={() => handleDropdownToggle("dashboard")}></span> */}

            </li>
            <li>
            <button onClick={toggleDropdown}>Students ▼</button>
            {isDropdownOpen && (
              <ul className="dropdown-content">
                <li onClick={() => handleItemClick("Item 1")}>Item 1</li>
                <li onClick={() => handleItemClick("Item 2")}>Item 2</li>
                <li onClick={() => handleItemClick("Item 3")}>Item 3</li>
              </ul>
            )}
            {/* <span onClick={() => handleDropdownToggle("dashboard")}>▼</span> */}
          </li>

          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </>
    </div>
  );
};

export default Sidebar;
