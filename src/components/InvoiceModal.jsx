import React, { useState } from "react";

import StatusBadge from "./StatusBadge";

import { getInvoiceStatus } from "../utils/invoiceHelpers";
import { formatDate } from "../utils/formatDate";

function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const [sending, setSending] = useState(false);

  const [sent, setSent] = useState(false);

  const handleSendInvoice = () => {
    setSending(true);

    setTimeout(() => {
      setSending(false);

      setSent(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-4">
      {/* Modal */}

      <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 relative animate-fadeIn">
        {/* Close */}

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
        >
          ✕
        </button>

        {/* Header */}

        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs sm:text-sm text-slate-400 mb-1">Invoice ID</p>

            <h2 className="text-2xl font-semibold text-slate-900">
              {invoice.id}
            </h2>
          </div>

          <StatusBadge status={getInvoiceStatus(invoice)} />
        </div>

        {/* Client Info */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div>
            <p className="text-xs sm:text-sm text-slate-400 mb-1">Client</p>

            <p className="font-medium text-slate-900 break-words">
              {invoice.client}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-slate-400 mb-1">Email</p>

            <p className="font-medium text-slate-900 break-all">
              {invoice.email}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-slate-400 mb-1">Due Date</p>

            <p className="font-medium text-slate-900">
              {formatDate(invoice.dueDate)}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-slate-400 mb-1">Amount</p>

            <p className="font-medium text-slate-900">
              ₹{invoice.amount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Notes */}

        <div className="mb-5">
          <p className="text-xs sm:text-sm text-slate-400 mb-2">Notes</p>

          <div className="bg-slate-50 rounded-2xl p-4 text-slate-600 text-sm sm:text-base">
            {invoice.notes || "No notes added."}
          </div>
        </div>

        {/* Line Items */}

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
            Line Items
          </h3>

          {invoice.items?.length ? (
            <div className="space-y-2">
              {invoice.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 bg-slate-50 rounded-2xl px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 break-words">
                      {item.description}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-slate-900 whitespace-nowrap">
                    ₹{(item.quantity * item.rate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-4 text-slate-500 text-sm">
              No line items available.
            </div>
          )}
        </div>

        {/* Send Button */}

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3">
          {sent && (
            <p className="text-sm text-green-600 font-medium">
              Invoice sent successfully
            </p>
          )}

          <button
            onClick={handleSendInvoice}
            disabled={sending || sent}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-medium transition
            ${
              sent
                ? "bg-green-600 text-white"
                : "bg-slate-900 text-white hover:opacity-90"
            }
            ${sending ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {sending ? "Sending..." : sent ? "Sent" : "Send Invoice"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
