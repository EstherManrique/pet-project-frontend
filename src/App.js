import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header.jsx";
import Stores from "./pages/Stores";
import AdminServicesDashboard from "./pages/Aministrator/AdminServicesDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AdminUsersDashboard from "./pages/Aministrator/AdminUsersDashboard.jsx";
import AdminStoreDashboard from "./pages/Aministrator/AdminStoreDashboard.jsx";
import Reservations from "./pages/Reservations.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <Fragment>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/services" element={<AdminServicesDashboard componentAction={'list'} />} />
            <Route path="/admin/services/add" element={<AdminServicesDashboard componentAction={'add'} />} />
            <Route path="/admin/services/edit/:id" element={<AdminServicesDashboard componentAction={'edit'} />} />
            <Route path="/admin/users" element={<AdminUsersDashboard componentAction={'list'} />} />
            <Route path="/admin/users/add" element={<AdminUsersDashboard componentAction={'add'} />} />
            <Route path="/admin/users/edit/:id" element={<AdminUsersDashboard componentAction={'edit'} />} />
            <Route path="/admin/stores" element={<AdminStoreDashboard componentAction={'list'} />} />
            <Route path="/admin/stores/add" element={<AdminStoreDashboard componentAction={'add'} />} />
            <Route path="/admin/stores/edit/:id" element={<AdminStoreDashboard componentAction={'edit'} />} />

            <Route path="/managers" element={<ManagerDashboard />} />

            <Route path="/reservations" element={<Reservations />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
