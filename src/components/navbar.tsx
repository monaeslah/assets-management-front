// src/components/Navbar.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Asset Tracker</h1>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/dashboard" className="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/assets" className="active">
              Assets
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees" className="active">
              Employees
            </NavLink>
          </li>
        </ul>
        <div className="navbar-user">
          <span>{user?.email || "User"}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
