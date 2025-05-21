const express = require("express");
const {
  getAllRoles,
  createRole,
  updateRole,
  removeRole,
  getModulesAccessibleByRole
} = require("../controllers/role-management.controller");
const { auth, authRole, isModuleAccessible } = require("../middlewares");
const router = express.Router();

router.get("/roles", auth, getAllRoles);
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

router.get(
  "/roles/:id/modules",
  auth,
  authRole,
  isModuleAccessible("role-management", "isRead"),
  getModulesAccessibleByRole
);

module.exports = router;
