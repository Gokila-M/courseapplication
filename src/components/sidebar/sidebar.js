import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import your CSS for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>LOGO</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/mycourses">My Courses</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
