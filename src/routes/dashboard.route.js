const express = require("express");
const router = express.Router();
const { getUserDashboard } = require("../controllers/dashboard.controller");
const { auth } = require("../middlewares");

// Get user dashboard
router.get("/dashboard", auth, getUserDashboard);

module.exports = router;
