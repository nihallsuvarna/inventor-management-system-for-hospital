const express = require("express");
const {
  getAllRoles,
  createRole,
  updateRole,
  removeRole,
  getModulesAccessibleByRole,
  assignModuleToRole,
  getAllUsersOfRole
} = require("../controllers/role-management.controller");
const { auth, authRole, isModuleAccessible } = require("../middlewares");
const router = express.Router();

// Get all roles
router.get("/roles", auth, getAllRoles);

// Create, update, and delete roles
router.post(
  "/roles",
  auth,
  authRole,
  isModuleAccessible("role-management", "isWrite"),
  createRole
);
router.put(
  "/roles/:id",
  auth,
  authRole,
  isModuleAccessible("role-management", "isUpdate"),
  updateRole
);

router.delete(
  "/roles/:id",
  auth,
  authRole,
  isModuleAccessible("role-management", "isDelete"),
  removeRole
);

// Assign modules to roles
router.get(
  "/roles/:id/modules",
  auth,
  authRole,
  isModuleAccessible("role-management", "isRead"),
  getModulesAccessibleByRole
);

// Assign modules to roles
router.post(
  "/roles/:id/modules",
  auth,
  authRole,
  isModuleAccessible("role-management", "isWrite"),
  assignModuleToRole
);

router.get(
  "/roles/:id/users",
  auth,
  authRole,
  isModuleAccessible("role-management", "isRead"),
  getAllUsersOfRole
);

module.exports = router;
