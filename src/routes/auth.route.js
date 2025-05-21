const express = require("express");
const router = express.Router();

const {
  signIn,
  signOut,
  register,
  changePassword
} = require("../controllers/auth.controller");
const { authRole, auth, isModuleAccessible } = require("../middlewares");

router.post("/sign-in", authRole, signIn);
router.post("/sign-out", signOut);
router.post(
  "/register",
  auth,
  authRole,
  isModuleAccessible("user-management", "isWrite"),
  register
);
router.post("/change-password", authRole, changePassword);

module.exports = router;
