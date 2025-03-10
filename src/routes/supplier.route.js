const express = require("express");
const { addSuppliers, findSupplier, listSuppliers } = require("../controllers/supplier");

const route = express.Router();

route.post("/add-suppliers", addSuppliers);
route.get("/find-supplier", findSupplier);
route.get("/list-suppliers", listSuppliers);

module.exports = route;
