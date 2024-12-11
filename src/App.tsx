import AppRoutes from "./routes/routes";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <AppRoutes />
    </>
  );
}

export default App;
