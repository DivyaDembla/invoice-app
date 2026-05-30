import React from "react";

import {
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[260px] bg-white border-r border-slate-200 px-6 py-8 flex-col justify-between min-h-screen">
      {/* Top Section */}

      <div>
        {/* Logo */}

        <div className="mb-14">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Invora
          </h1>

          <p className="text-sm text-slate-400 mt-1">Finance workspace</p>
        </div>

        {/* Navigation */}

        <nav className="space-y-2">
          {/* Dashboard */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition
              ${
                isActive
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-500 hover:bg-slate-100"
              }`
            }
          >
            <HiOutlineSquares2X2 size={20} />
            Dashboard
          </NavLink>

          {/* Invoices */}

          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition
              ${
                isActive
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-500 hover:bg-slate-100"
              }`
            }
          >
            <HiOutlineDocumentText size={20} />
            Invoices
          </NavLink>

          {/* Create Invoice */}

          <NavLink
            to="/create"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition
              ${
                isActive
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-500 hover:bg-slate-100"
              }`
            }
          >
            <HiOutlineUsers size={20} />
            Create Invoice
          </NavLink>
        </nav>
      </div>

      {/* Bottom Profile Card */}

      <div className="border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
            D
          </div>

          <div>
            <p className="font-medium text-slate-800">Divya</p>

            <p className="text-xs text-slate-400 mt-0.5">Frontend Developer</p>
          </div>
        </div>

        <button className="mt-5 flex items-center justify-center gap-2 w-full border border-slate-200 rounded-xl py-2.5 text-sm text-slate-600 hover:bg-slate-100 transition">
          <HiOutlineCog6Tooth size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
