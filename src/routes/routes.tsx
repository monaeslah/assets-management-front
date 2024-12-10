import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/login";
import SignUpPage from "../pages/auth/signup";
import ProtectedRoute from "./protectRoutes";
import NotFound from "../pages/notfound";
import Dashboard from "../pages/dashboard";
import AssetPage from "../pages/officeassets/viewassets";

const AppRoutes = () => {
  return (
    <div className="main-area">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/*" element={<NotFound />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <AssetPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
