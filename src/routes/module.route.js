const express = require("express");
const { addModule, getOneModule, getModule } = require("../controllers/module");

const route = express.Router();

route.post("/add-module", addModule);
route.get("/get-one-module", getOneModule);
route.get("/get-module", getModule);

module.exports = route;
