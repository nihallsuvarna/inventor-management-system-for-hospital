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

// GET /roles: Get all roles.

// GET /roles/:id: Get a single role by ID.

// POST /roles: Create a new role.

// PUT /roles/:id: Update a role by ID.

// DELETE /roles/:id: Delete a role by ID.

// GET /roles/modules/:moduleId: Get roles accessible by a specific module.

// GET /roles/users/:userId: Get roles accessible by a specific user.

// User Roles
// GET /users/:userId/roles: Get roles for a specific user.

// POST /users/:userId/roles: Assign a role to a user.

// DELETE /users/:userId/roles/:roleId: Remove a role from a user.

// Permissions
// GET /permissions: Get all permissions.

// GET /permissions/:id: Get a single permission by ID.

// POST /permissions: Create a new permission.

// PUT /permissions/:id: Update a permission by ID.

// DELETE /permissions/:id: Delete a permission by ID.

// GET /permissions/role/:roleId: Get permissions for a specific role.

// GET /permissions/module/:moduleId: Get permissions for a specific module.

module.exports = router;
