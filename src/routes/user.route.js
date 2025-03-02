const express = require("express");

const { register, signIn } = require("../controllers/user");
const { addRole } = require("../controllers/role");
const { auth } = require("../middlewares");

const route = express.Router();

// Admin route
route.post("/register", register);
route.post("/add-role", addRole);

route.post("/sign-in", auth, signIn);

module.exports = route;
