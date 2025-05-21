const express = require("express");
const {
  getAllInventors
} = require("../controllers/inventor-management.controller");
const { auth, authRole, isModuleAccessible } = require("../middlewares");

const router = express.Router();

router.get(
  "/inventor/get-all-inventors",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isRead"),
  getAllInventors
);

module.exports = router;
