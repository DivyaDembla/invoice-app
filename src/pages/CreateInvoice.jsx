import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { addInvoice } from "../redux/invoiceSlice";

function CreateInvoice() {
  const dispatch = useDispatch();

  const [client, setClient] = useState("");

  const [email, setEmail] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});

  const [items, setItems] = useState([
    {
      description: "",
      quantity: "",
      rate: "",
    },
  ]);

  // HANDLE ITEM CHANGE

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] = value;

    setItems(updatedItems);

    setErrors((prev) => ({
      ...prev,
      items: "",
    }));
  };

  // ADD ITEM

  const addLineItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: "",
        rate: "",
      },
    ]);
  };

  // TOTAL

  const total = items.reduce(
    (acc, item) => acc + Number(item.quantity || 0) * Number(item.rate || 0),
    0,
  );

  // SAVE INVOICE

  const handleSubmit = () => {
    const newErrors = {};

    // VALIDATIONS

    if (!client.trim()) {
      newErrors.client = "Client name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    // CHECK LINE ITEMS

    const hasInvalidItem = items.some(
      (item) => !item.description.trim() || !item.quantity || !item.rate,
    );

    if (hasInvalidItem) {
      newErrors.items = "Complete all line item fields";
    }

    setErrors(newErrors);

    // STOP SUBMIT

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // CREATE INVOICE

    const newInvoice = {
      id: `INV-${Date.now()}`,
      client,
      email,
      dueDate,
      notes,
      amount: total,
      status: "Pending",
      items,
    };

    dispatch(addInvoice(newInvoice));

    alert("Invoice Created");

    // RESET

    setClient("");
    setEmail("");
    setDueDate("");
    setNotes("");

    setItems([
      {
        description: "",
        quantity: "",
        rate: "",
      },
    ]);

    setErrors({});
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          Create Invoice
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Generate and manage invoices professionally.
        </p>
      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 sm:p-8">
          {/* Client Info */}

          <div className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-5 sm:mb-6">
              Client Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* CLIENT */}

              <div>
                <input
                  type="text"
                  placeholder="Client Name"
                  value={client}
                  onChange={(e) => {
                    setClient(e.target.value);

                    setErrors((prev) => ({
                      ...prev,
                      client: "",
                    }));
                  }}
                  className={`w-full border ${
                    errors.client ? "border-red-500" : "border-slate-200"
                  } rounded-2xl px-5 py-4 outline-none focus:border-slate-400 transition`}
                />

                {errors.client && (
                  <p className="text-sm text-red-500 mt-2">{errors.client}</p>
                )}
              </div>

              {/* EMAIL */}

              <div>
                <input
                  type="email"
                  placeholder="Client Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                    }));
                  }}
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-slate-200"
                  } rounded-2xl px-5 py-4 outline-none focus:border-slate-400 transition`}
                />

                {errors.email && (
                  <p className="text-sm text-red-500 mt-2">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Line Items */}

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Line Items
              </h2>

              <button
                onClick={addLineItem}
                className="w-full sm:w-auto text-sm bg-slate-900 text-white px-4 py-3 rounded-xl hover:opacity-90 transition"
              >
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-slate-400 transition"
                  />

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-slate-400 transition"
                  />

                  <input
                    type="number"
                    placeholder="Rate (₹)"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(index, "rate", e.target.value)
                    }
                    className="border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-slate-400 transition"
                  />
                </div>
              ))}
            </div>

            {errors.items && (
              <p className="text-sm text-red-500 mt-4">{errors.items}</p>
            )}
          </div>
        </div>

        {/* Right Summary */}

        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 h-fit lg:sticky lg:top-8">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6">
            Invoice Summary
          </h2>

          {/* Due Date */}

          <div className="mb-5">
            <label className="text-sm text-slate-500 block mb-2">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  dueDate: "",
                }));
              }}
              className={`w-full border ${
                errors.dueDate ? "border-red-500" : "border-slate-200"
              } rounded-2xl px-4 py-3 outline-none`}
            />

            {errors.dueDate && (
              <p className="text-sm text-red-500 mt-2">{errors.dueDate}</p>
            )}
          </div>

          {/* Notes */}

          <div className="mb-6">
            <label className="text-sm text-slate-500 block mb-2">Notes</label>

            <textarea
              rows="5"
              placeholder="Payment instructions, bank details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none resize-none"
            />
          </div>

          {/* Total */}

          <div className="border-t border-slate-200 pt-5 mb-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-slate-500">Total</p>

              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 break-words text-right">
                ₹{total.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Button */}

          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-medium hover:opacity-90 transition"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;
