import React from "react";

import { NavLink } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./layouts/Sidebar";

import Dashboard from "./pages/Dashboard";

import Invoices from "./pages/Invoices";

import CreateInvoice from "./pages/CreateInvoice";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 flex">
        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/invoices" element={<Invoices />} />

            <Route path="/create" element={<CreateInvoice />} />
          </Routes>

          {/* Mobile Navigation */}

          <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex-1 text-center py-2 rounded-xl text-sm font-medium transition
      ${isActive ? "bg-slate-900 text-white" : "text-slate-600 bg-slate-100"}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                `flex-1 text-center py-2 rounded-xl text-sm font-medium transition
      ${isActive ? "bg-slate-900 text-white" : "text-slate-600 bg-slate-100"}`
              }
            >
              Invoices
            </NavLink>

            <NavLink
              to="/create"
              className={({ isActive }) =>
                `flex-1 text-center py-2 rounded-xl text-sm font-medium transition
      ${isActive ? "bg-slate-900 text-white" : "text-slate-600 bg-slate-100"}`
              }
            >
              Create
            </NavLink>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
