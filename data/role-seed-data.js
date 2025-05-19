const roles = [
  {
    label: "Admin",
    description:
      "Full control of the system. Manage users, roles, items, transactions, departments, suppliers",
    key: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: "Inventory Manager",
    description:
      "Manages stock and transactions. Add/update items, process inward/outward transactions, generate reports",
    key: "inventory-manager",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: "Department Head",
    description:
      "Manages stock and transactions. Add/update items, process inward/outward transactions, generate reports",
    key: "department-head",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: "Pharmacist",
    description:
      "Manages pharmacy inventory. Manage medicine stock, issue medications, view expiry reports",
    key: "pharmacist",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: "Procurement Officer",
    description:
      "Handles supplier interactions and orders. Manage suppliers, place orders, update order status",
    key: "procurement-officer",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: "Auditor",
    description:
      "Reviews and monitors inventory for accuracy. Read-only access to reports, logs, and audit history",
    key: "auditor",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = roles;
