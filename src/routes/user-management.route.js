const express = require("express");
const { getAllUsers, getAllUsersWithRole, getAllRolesOfUser } = require("../controllers/user-management.controller");
const { auth, isModuleAccessible, authRole } = require("../middlewares");
const router = express.Router();

// Get all users
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


module.exports = router;
