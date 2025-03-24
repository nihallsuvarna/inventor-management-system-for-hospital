const express = require("express");
const router = express.Router();

const {
  addOrderType,
  listAllOrderTypes
} = require("../controllers/order_type");

router.post("/add-order-type", addOrderType);
router.get("/list-order-type", listAllOrderTypes);

module.exports = router;
