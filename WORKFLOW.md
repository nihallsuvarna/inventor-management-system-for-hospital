# Inventor Management System for Hospital

This system is designed to manage the inventory of a hospital. It is built using the NOde.js framework and PostgreSQL database.

## Development Workflow

1. Create all APIs, which have less dependencies or Master Data.
   - Create Modules APIs and Add Modules.
     - User & Role Management
     - Item Management
     - Supplier Management
     - Department Management
     - Inventory Inward (Stock In)
     - Inventory Outward (Stock Out)
     - Stock Adjustment
     - Transactions & History
     - Purchase Management
     - Reports & Analytics
     - Notifications & Alerts
     - Audit & Logs
   - Create Role APIs and Add Roles.
     - Admin
     - Inventory Manager
     - Department Head
     - Pharmacist
     - Procurement Officer
     - Auditor
   - Create Permission APIs and Add Permissions.
   - Create Department APIs and Add Departments.
     - Emergency (ER)
     - Surgery / Operating Theater (OT)
     - ICU / Critical Care
     - Orthopedics
     - Cardiology
     - Neurology
     - Pharmacy
   - Create Category APIs and Add Categories.
     - Medical Equipment
     - Surgical Equipment
     - Pharmaceuticals
     - Laboratory Equipment
     - Diagnostic Equipment
     - Other Equipment


 - Node version
 - postgres version
 - seed 