import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loginpage from "./Loginpage";
import Registerpage from "./Registerpage";
import Homepage from "./Homepage/";
import Forgetpage from "./Forgetpage";
import ResetPage from "./ResetPage";
// import { useSelector } from "react-redux";

const UserRoutes = () => {
  // const isLogged = useSelector((state) => state.user.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      <Route path="/forget" element={<Forgetpage />} />
          <Route path="/home" element={<Homepage />} />
      <Route path="/api/v1/users/resetPassword/:id" element={<ResetPage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default UserRoutes;
