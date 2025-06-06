const express = require("express");
const {
  getAllDepartments,
  createNewDepartment,
  updateDepartmentData,
  deleteDepartmentData,
  getAllDepartmentUsers
} = require("../controllers/department-management.controller");
const { auth, authRole, isModuleAccessible } = require("../middlewares");
const router = express.Router();

// GET /departments: Get all departments.
router.get(
  "/department",
  auth,
  authRole,
  isModuleAccessible("department-management", "isRead"),
  getAllDepartments
);

// Add New Department
router.post(
  "/department",
  auth,
  authRole,
  isModuleAccessible("department-management", "isWrite"),
  createNewDepartment
);

// Update Department
router.put(
  "/department/:id",
  auth,
  authRole,
  isModuleAccessible("department-management", "isUpdate"),
  updateDepartmentData
);

// Delete Department
router.delete(
  "/department/:id",
  auth,
  authRole,
  isModuleAccessible("department-management", "isDelete"),
  deleteDepartmentData
);

router.get(
  "/department/:id",
  auth,
  authRole,
  isModuleAccessible("department-management", "isRead"),
  getAllDepartmentUsers
)

// GET /departments/:id: Get a single department by ID.

// POST /departments: Create a new department.

// PUT /departments/:id: Update a department by ID.

// DELETE /departments/:id: Delete a department by ID.

module.exports = router;
