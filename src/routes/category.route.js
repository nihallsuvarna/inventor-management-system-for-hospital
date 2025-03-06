const express = require("express");
const {
  addCategory,
  editCategory,
  getAllCategory
} = require("../controllers/category");

const route = express.Router();

route.post("/add-category", addCategory);
route.post("/edit-category", editCategory);

route.get("/category", getAllCategory);

module.exports = route;
