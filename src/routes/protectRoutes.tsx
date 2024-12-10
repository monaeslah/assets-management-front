import { Navigate } from "react-router-dom";
import { useState } from "react";

import { useAuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext();

  return token ? (
    <div className={`main-content `}>
      {/* <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      <div
        style={{
          marginLeft: "70px",
          transition: "margin-left 0.3s ease",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;