const express = require("express");

const {
  register,
  signIn,
  changePassword,
  getAllUsers,
  getUser
} = require("../controllers/user");
const { addRole } = require("../controllers/role");
const { auth, authRole } = require("../middlewares");

const route = express.Router();

// Admin route
route.post("/register", register);
route.post("/add-role", addRole);

route.post("/sign-in", authRole, signIn);
route.post("/change-password", changePassword);
route.get("/get-user", getUser);
route.get("/get-all-users", getAllUsers);

// Role

module.exports = route;
