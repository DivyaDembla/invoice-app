import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import StatusBadge from "../components/StatusBadge";

import { getInvoiceStatus } from "../utils/invoiceHelpers";

import { markAsPaid } from "../redux/invoiceSlice";

import InvoiceModal from "../components/InvoiceModal";

function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = useSelector((state) => state.invoices.invoices);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const dispatch = useDispatch();

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.client
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ? true : getInvoiceStatus(invoice) === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Invoices
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Manage and track all invoices.
          </p>
        </div>
      </div>

      {/* Filters */}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3 outline-none focus:border-slate-400 transition"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
      </div>

      {/* Invoice List */}

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => setSelectedInvoice(invoice)}
              className="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer"
            >
              {/* Desktop View */}

              <div className="hidden md:flex items-center justify-between px-6 py-5">
                <div className="min-w-[180px]">
                  <p className="font-medium text-slate-900">{invoice.client}</p>

                  <p className="text-sm text-slate-400 mt-1">{invoice.id}</p>
                </div>

                <div className="text-slate-500 min-w-[220px]">
                  {invoice.email}
                </div>

                <div className="font-medium text-slate-800 min-w-[120px] text-right">
                  ₹{invoice.amount.toLocaleString()}
                </div>

                <div className="min-w-[140px] flex justify-center">
                  <StatusBadge status={getInvoiceStatus(invoice)} />
                </div>

                <div className="min-w-[120px] flex justify-end">
                  {getInvoiceStatus(invoice) !== "Paid" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(markAsPaid(invoice.id));
                      }}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                    >
                      Mark Paid
                    </button>
                  ) : (
                    <span className="text-sm text-slate-300">—</span>
                  )}
                </div>
              </div>

              {/* Mobile View */}

              <div className="md:hidden p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      {invoice.client}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">{invoice.id}</p>
                  </div>

                  <StatusBadge status={getInvoiceStatus(invoice)} />
                </div>

                <div>
                  <p className="text-sm text-slate-500 break-all">
                    {invoice.email}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">
                    ₹{invoice.amount.toLocaleString()}
                  </p>

                  {getInvoiceStatus(invoice) !== "Paid" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(markAsPaid(invoice.id));
                      }}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                    >
                      Mark Paid
                    </button>
                  ) : (
                    <span className="text-sm text-slate-300">Paid</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center">
            <p className="text-slate-400">No invoices found.</p>
          </div>
        )}
      </div>

      {/* Modal */}

      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}

export default Invoices;
