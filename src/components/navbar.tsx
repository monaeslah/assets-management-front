// src/components/Navbar.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Navbar: React.FC = () => {
  const { userInfo, logout } = useAuthContext();
  const navigate = useNavigate();
  console.log(userInfo);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h5>Asset Tracker</h5>
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
          <span>{userInfo?.email || "User"}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
