const invoices = [
  {
    id: "INV-1001",
    client: "Luma Studio",
    email: "billing@lumastudio.com",
    amount: 17928,
    status: "Paid",
    dueDate: "2026-06-20",

    notes:
      "Please process payment within 7 business days. Bank transfer preferred.",

    items: [
      {
        description: "UI/UX Design Sprint",
        quantity: 12,
        rate: 1494,
      },
    ],
  },

  {
    id: "INV-1002",
    client: "Nova Labs",
    email: "accounts@novalabs.io",
    amount: 38400,
    status: "Pending",
    dueDate: "2026-06-28",

    notes: "Monthly frontend development retainer invoice.",

    items: [
      {
        description: "React Dashboard Development",
        quantity: 12,
        rate: 2200,
      },

      {
        description: "API Integration",
        quantity: 6,
        rate: 2000,
      },
    ],
  },

  {
    id: "INV-1003",
    client: "PixelNest Studio",
    email: "finance@pixelnest.design",
    amount: 28500,
    status: "Overdue",
    dueDate: "2026-05-10",

    notes: "Final invoice for branding and design package.",

    items: [
      {
        description: "Brand Identity Design",
        quantity: 1,
        rate: 20000,
      },

      {
        description: "Social Media Kit",
        quantity: 1,
        rate: 8500,
      },
    ],
  },

  {
    id: "INV-1004",
    client: "OrbitX Technologies",
    email: "finance@orbitx.io",
    amount: 21600,
    status: "Pending",
    dueDate: "2026-07-05",

    notes:
      "Payment due within 10 business days. Include invoice ID in bank transfer reference.",

    items: [
      {
        description: "Frontend Dashboard Development",
        quantity: 8,
        rate: 1800,
      },

      {
        description: "Performance Optimization",
        quantity: 6,
        rate: 1200,
      },
    ],
  },
];

export default invoices;
