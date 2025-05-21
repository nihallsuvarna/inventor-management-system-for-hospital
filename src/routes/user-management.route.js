const express = require("express");
const { getAllUsers, getAllUsersWithRole } = require("../controllers/user-management.controller");
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



module.exports = router;
