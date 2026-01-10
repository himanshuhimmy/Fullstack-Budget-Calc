import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import DashBoard from "../DashBoard";
import Pie_Charts from "../Resuable/Pie_Charts";
import ProtectedLayout from "./ProtectedLayout";
import PublicLayout from "./PublicLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/pie" element={<Pie_Charts />} />a
      </Route>
    </Routes>
  );
};

export default AppRoutes;
