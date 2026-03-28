import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLogoutHandler } from "./services/api/APIIntercepter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./utility/ProtectedRoute";

function AppWithAuth() {
  const { logout } = useAuth();

  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path={"dashboard"}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}

export default App;
