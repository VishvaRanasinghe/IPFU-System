import React from "react";
import Sidebar3 from "../components/Sidebar3";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
      </div>
      <div className="grid sm:grid-cols-12 gap-12 h-screen">
        {/* Sidebar */}
        <div className="sm:col-span-2 sticky">
          <Sidebar3 />
        </div>

        {/* Main Content */}
        <div className="bg-slate-100 sm:col-span-10 sticky z-10">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
