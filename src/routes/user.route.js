const express = require("express");

const { register, signIn, changePassword } = require("../controllers/user");
const { addRole } = require("../controllers/role");
const { auth } = require("../middlewares");

const route = express.Router();

// Admin route
route.post("/register", register);
route.post("/add-role", addRole);

route.post("/sign-in", signIn);
route.post("/change-password", changePassword);

module.exports = route;
