const express = require("express");
const { addCustomer } = require("../controllers/customer");

const router = express.Router();

router.post("/customer", addCustomer);

module.exports = router;
