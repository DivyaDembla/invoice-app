import React from "react";

function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Overdue: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </div>
  );
}

export default StatusBadge;
