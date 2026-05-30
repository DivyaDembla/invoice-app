export const getInvoiceStatus = (invoice) => {
  if (invoice.status === "Paid") {
    return "Paid";
  }

  const today = new Date();

  const dueDate = new Date(invoice.dueDate);

  if (today > dueDate) {
    return "Overdue";
  }

  return "Pending";
};
