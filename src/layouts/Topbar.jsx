import React from "react";

function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Dashboard</h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage your invoices efficiently
        </p>
      </div>

      <button className="bg-slate-900 text-white px-5 py-3 rounded-xl font-medium hover:bg-slate-800 transition">
        Create Invoice
      </button>
    </header>
  );
}

export default Topbar;
