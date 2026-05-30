import React from "react";

import { useSelector } from "react-redux";

import { getInvoiceStatus } from "../utils/invoiceHelpers";

import StatusBadge from "../components/StatusBadge";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const invoices = useSelector((state) => state.invoices.invoices);

  const navigate = useNavigate();

  // Dashboard Stats

  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (inv) => getInvoiceStatus(inv) === "Paid",
  ).length;

  const pendingInvoices = invoices.filter(
    (inv) => getInvoiceStatus(inv) === "Pending",
  ).length;

  const overdueInvoices = invoices.filter(
    (inv) => getInvoiceStatus(inv) === "Overdue",
  ).length;

  const totalRevenue = invoices
    .filter((inv) => getInvoiceStatus(inv) === "Paid")
    .reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
        <div>
          <p className="text-sm text-slate-400 mb-2">Welcome back</p>

          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
            Good morning, Divya 👋
          </h1>

          <p className="text-slate-500 mt-3 text-base sm:text-lg">
            You have {pendingInvoices} pending invoices this week.
          </p>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="w-full sm:w-auto bg-slate-900 text-white px-5 py-3 rounded-2xl font-medium hover:opacity-90 transition"
        >
          Create Invoice
        </button>
      </div>

      {/* Main Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}

        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-slate-400 text-sm">Total Revenue</p>

              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900 mt-2 break-words">
                ₹{totalRevenue.toLocaleString()}
              </h2>
            </div>

            <div className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-xs sm:text-sm font-medium">
              +12.5%
            </div>
          </div>

          {/* Graph */}

          <div className="h-[180px] sm:h-[220px] flex items-end gap-2 sm:gap-4">
            <div className="bg-slate-200 rounded-full w-6 sm:w-10 h-20 sm:h-24"></div>

            <div className="bg-slate-300 rounded-full w-6 sm:w-10 h-32 sm:h-40"></div>

            <div className="bg-indigo-500 rounded-full w-6 sm:w-10 h-44 sm:h-52"></div>

            <div className="bg-slate-300 rounded-full w-6 sm:w-10 h-28 sm:h-32"></div>

            <div className="bg-slate-200 rounded-full w-6 sm:w-10 h-16 sm:h-20"></div>
          </div>
        </div>

        {/* Activity / Stats */}

        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Overview
          </h3>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Total Invoices</p>

              <p className="font-semibold text-slate-900">{totalInvoices}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-slate-500">Paid</p>

              <p className="font-semibold text-green-600">{paidInvoices}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-slate-500">Pending</p>

              <p className="font-semibold text-amber-500">{pendingInvoices}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-slate-500">Overdue</p>

              <p className="font-semibold text-red-500">{overdueInvoices}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}

      <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
            Recent Invoices
          </h3>
          <button
            onClick={() => navigate("/invoices")}
            className="text-sm text-slate-500 hover:text-slate-900 transition"
          >
            View all
          </button>
        </div>

        <div className="space-y-3">
          {invoices.slice(0, 4).map((invoice) => (
            <div
              key={invoice.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-5 py-4 rounded-2xl hover:bg-slate-50 transition cursor-pointer"
            >
              <div>
                <p className="font-medium text-slate-800">{invoice.client}</p>

                <p className="text-sm text-slate-400 mt-1">{invoice.id}</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5">
                <p className="font-medium text-slate-700">
                  ₹{invoice.amount.toLocaleString()}
                </p>

                <StatusBadge status={getInvoiceStatus(invoice)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
