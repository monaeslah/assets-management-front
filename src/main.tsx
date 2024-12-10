import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext.tsx";
import { AssetProvider } from "./context/assetsContext.tsx";
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
          <App />
        </AssetProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
