const express = require("express");
const {
  addCustomer,
  getAllCustomers,
  getCustomer
} = require("../controllers/customer");

const router = express.Router();

router.post("/customer", addCustomer);
router.get("/get-customer", getCustomer);
router.get("/get-all-customers", getAllCustomers);

module.exports = router;
