const express = require("express");
const { listRole } = require("../controllers/role");

const route = express.Router();

route.get("/list-role", listRole);

module.exports = route;
