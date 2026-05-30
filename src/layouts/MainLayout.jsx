import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      <Sidebar />

      <main className="flex-1 px-10 py-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
