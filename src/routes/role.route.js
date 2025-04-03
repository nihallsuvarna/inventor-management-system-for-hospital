const express = require("express");
const { listRole, addRole } = require("../controllers/role");

const route = express.Router();

route.get("/list-role", listRole);
route.post("/add-role", addRole);

module.exports = route;
