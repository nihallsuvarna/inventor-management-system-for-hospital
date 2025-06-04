const express = require("express");
const {
  getAllInventors,
  getAllBatchDetails,
  getAllBatchOfItem
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

router.get(
  "/inventor/get-all-batch",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isRead"),
  getAllBatchDetails
);

router.get(
  "/inventor/get-all-batch/:id",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isRead"),
  getAllBatchOfItem
);

module.exports = router;
