import { createSlice } from "@reduxjs/toolkit";

import invoicesData from "../data/invoices";

// LOAD FROM LOCALSTORAGE

const savedInvoices = localStorage.getItem("invoices");

const initialInvoices = savedInvoices
  ? JSON.parse(savedInvoices)
  : invoicesData;

const invoiceSlice = createSlice({
  name: "invoices",

  initialState: {
    invoices: initialInvoices,
  },

  reducers: {
    addInvoice: (state, action) => {
      state.invoices.unshift(action.payload);

      localStorage.setItem("invoices", JSON.stringify(state.invoices));
    },

    markAsPaid: (state, action) => {
      const invoice = state.invoices.find((inv) => inv.id === action.payload);

      if (invoice) {
        invoice.status = "Paid";

        localStorage.setItem("invoices", JSON.stringify(state.invoices));
      }
    },
  },
});

export const { addInvoice, markAsPaid } = invoiceSlice.actions;

export default invoiceSlice.reducer;
