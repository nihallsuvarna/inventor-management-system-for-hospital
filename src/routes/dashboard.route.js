const express = require("express");
const router = express.Router();
const { getUserDashboard } = require("../controllers/dashboard.controller");
const { auth } = require("../middlewares");

router.get("/dashboard", auth, getUserDashboard);

module.exports = router;
