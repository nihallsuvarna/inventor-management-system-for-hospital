const express = require("express");

const { addItem, listAllItems } = require("../controllers/item");

const route = express.Router();

route.post("/add-item", addItem);
route.get("/list-all-items", listAllItems);

module.exports = route;
