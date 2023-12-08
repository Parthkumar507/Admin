// Sidebar.js
import React, { useEffect, useState } from "react";
import "../style/sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ user }) => {
  

  const dropdowns = [
    {
      id: 1,
      label: "Job",
      items: ["Post", "Update", "Delete"],
      permission: "Job",
    },
    {
      id: 2,
      label: "Resume",
      items: ["Post", "Update", "Delete"],
      permission: "Resume",
    },
    {
      id: 3,
      label: "Settings",
      items: [
        "Team or Users",
        "Payment Settings",
        "Roles and Permission",
        "Email Setting",
      ],
      permission: "Settings",
    },
    // Add more dropdowns as needed
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/fetchpermission/${user._id}`
        );
        setUserPermissions(response.data.permissions);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      }
    };

    if (user) {
      fetchUserPermissions();
    }
  }, [user]);

  const hasPermission = (permission) => {
    // console.log("userPermissions : ", userPermissions)
    // console.log("permission : ", permission)
    // console.log("userPermissions.includes(permission)",userPermissions.includes(permission));
    return userPermissions.includes(permission);
  };

  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleItemClick = (dropdownId, item) => {
    // Do something when an item is clicked
    console.log(`Selected from ${dropdownId}: ${item}`);
    // Close the dropdown after an item is clicked
    setOpenDropdown(null);

  };

  return (
    <div className="sidebar">
      <>
        <h2>Welcome {user && <h1>{user.name}</h1>}</h2>
        {/* <h2>Welcome </h2> */}
        <ul>
          {dropdowns.map(
            (dropdown) =>
              hasPermission(dropdown.permission) && (
                <li key={dropdown.id}>
                  <button onClick={() => toggleDropdown(dropdown.id)}>
                    {dropdown.label} {openDropdown === dropdown.id ? "▲" : "▼"}
                  </button>
                  {openDropdown === dropdown.id && (
                    <ul className="dropdown-content">

                      {dropdown.items.map((item, index) => (
                
                        <li
                          key={index}
                          onClick={() => handleItemClick(dropdown.id, item)}
                        >
                        <a href={`${dropdown.label}/${item.replace(/\s+/g, '')}?userId=${user._id}`}>
                        {/* <a href={`${dropdown.label}/${item.replace(/\s+/g, '')}`}> */}
                        {/* <a href={dropdown.label + '/'+item}> */}
                          {item}
                        </a>
                          
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
          )}
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </>
    </div>
  );
};

export default Sidebar;
