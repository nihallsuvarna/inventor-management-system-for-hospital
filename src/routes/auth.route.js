const express = require("express");
const router = express.Router();

const { signIn, signOut, register } = require("../controllers/auth.controller");
const { authRole } = require("../middlewares");

// router.post("/register", register);
router.post("/sign-in", authRole, signIn);
router.post("/sign-out", signOut);

module.exports = router;
