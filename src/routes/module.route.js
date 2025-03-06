const express = require("express");
const { addModule } = require("../controllers/module")

const route = express.Router();

route.post('/add-module', addModule)


module.exports = route