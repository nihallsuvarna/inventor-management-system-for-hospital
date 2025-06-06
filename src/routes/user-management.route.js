const express = require("express");
const { getAllUsers, getAllUsersWithRole, getAllRolesOfUser } = require("../controllers/user-management.controller");
const { auth, isModuleAccessible, authRole } = require("../middlewares");
const router = express.Router();

// GET /users: Get all users.
router.get(
  "/user/get-all-users",
  auth,
  authRole,
  isModuleAccessible("user-management", "isRead"),
  getAllUsersWithRole
);

// Get All roles of user
router.get(
  "/user/roles/:id",
  auth,
  authRole,
  isModuleAccessible("user-management", "isRead"),
  getAllRolesOfUser
)

// GET /users/:id: Get a single user by ID

// POST /users: Create a new user (e.g., registration).

// PUT /users/:id: Update a user by ID.

// DELETE /users/:id: Delete a user by ID.

// GET /users/department/:departmentId: Get users by department.

// GET /users/role/:roleId: Get users by role.


module.exports = router;
