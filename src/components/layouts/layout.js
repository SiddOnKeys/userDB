import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";
import Header from "../header";
const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex pt-32 pb-4 justify-center custom-bg">
        <div className="flex max-w-6xl w-full p-6 bg-white bg-opacity-50 rounded-lg ">
          <Outlet /> {/* This renders the child routes */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
