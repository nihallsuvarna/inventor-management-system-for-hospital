const express = require("express");
const { addDepartment, getDepartment } = require("../controllers/department");

const route = express.Router();

route.get("/department", getDepartment)
route.post("/add-department", addDepartment); 

module.exports = route;
