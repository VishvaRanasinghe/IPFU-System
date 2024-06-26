import React from "react";
import Sidebar2 from "../components/Sidebar2";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout2 = () => {
  return (
    <>
      <Navbar />
      <div className="grid sm:grid-cols-12 gap-12 h-screen">
        {/* Sidebar */}
        <div className="sm:col-span-2">
          <Sidebar2 />
        </div>

        {/* Main Content */}
        <div className="sm:col-span-10">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout2;
