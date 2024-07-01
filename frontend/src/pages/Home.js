import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Widges from "./Widges/Widges";
// import { useAuthState } from "react-firebase-hooks/auth";
import "../App.css";
// import auth from "../firebase.init";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // const user = useAuthState(auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="app">
      <Sidebar handleLogout={handleLogout} user={user} />
      <div
        style={{
          borderRight: "1px solid gray",
          // width: "40%",
        }}
        className="flex-grow w-[40%] sm:w-[85%] lg:w-[50%] border-r border-gray-300"
      >
        <Outlet />
      </div>
      <Widges />
    </div>
  );
};

export default Home;
