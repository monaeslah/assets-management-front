import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext.tsx";
import { AssetProvider } from "./context/assetContext.tsx";
import { EmployeeProvider } from "./context/employeesContext.tsx";
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure 'index.html' has a <div id='root'></div>."
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <AssetProvider>
          <EmployeeProvider>
            <App />
          </EmployeeProvider>
        </AssetProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
