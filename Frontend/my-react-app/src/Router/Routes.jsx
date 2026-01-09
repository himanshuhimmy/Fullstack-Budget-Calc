import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import DashBoard from "../DashBoard";
import Pie_Charts from "../Resuable/Pie_Charts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/Dashboard" element={<DashBoard />} />
      <Route path="/Pie" element={<Pie_Charts />} />
    </Routes>
  );
};

export default AppRoutes;
