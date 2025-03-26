const express = require("express");
const router = express.Router();

const {
  addOrderOutward,
//   listAllOrderOutwards
} = require("../controllers/order_outward");

router.post("/add-order-outward", addOrderOutward);
// router.get("/list-order-outward", listAllOrderOutwards);

module.exports = router;
