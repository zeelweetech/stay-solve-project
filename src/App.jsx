import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import SignIn from "views/auth/SignIn";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/*" element={<AdminLayout />} />
        {/* <Route path="rtl/*" element={<RtlLayout />} /> */}
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
