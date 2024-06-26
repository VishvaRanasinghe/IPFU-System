import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
        <Navbar />
      <div className="grid sm:grid-cols-12 h-screen">
        {/* Sidebar */}
        <div className="sm:col-span-2">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="bg-slate-100 sm:col-span-10 sticky">
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
