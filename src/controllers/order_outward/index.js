const {
  OrderOutwardService,
  OrderOutwardItemService
} = require("../../services");

async function addOrderOutward(req, res) {
  const {
    order_date,
    issued_by,
    items_ordered,
    order_type_id,
    user_id,
    department_id,
    transaction_type,
    transaction_date,
    amount
  } = req.body;

  try {
    // Check
    if (!order_date || !issued_by) {
      return res.status(400).json({
        status: 400,
        message: "Missing required fields",
        result: null
      });
    }

    // check if there are any item to order
    if (Array.isArray(items_ordered) && items_ordered.length === 0) {
      return res
        .status(400)
        .json({ status: 400, message: "No items to order", result: null });
    }

    if (!user_id) {
      return res.status(400).json({
        status: 400,
        message: "User id is required",
        result: null
      });
    }

    if (!department_id) {
      return res.status(400).json({
        status: 400,
        message: "Department id is required",
        result: null
      });
    }

    if (!transaction_type) {
      return res.status(400).json({
        status: 400,
        message: "Transaction type is required",
        result: null
      });
    }

    if (!transaction_date) {
      return res.status(400).json({
        status: 400,
        message: "Transaction date is required",
        result: null
      });
    }

    if (!amount || amount === 0) {
      return res.status(400).json({
        status: 400,
        message: "Amount is required",
        result: null
      });
    }

    // Create order outward item
    const newOrderOutward = await OrderOutwardService.addOrderOutward({
      order_type_id,
      order_date,
      issued_by
    });

    if (!newOrderOutward) {
      return res.status(404).json({
        status: 404,
        message: "Something went wrong while creating order outward",
        result: null
      });
    }

    // Create order outward items list
    const listOfItems = items_ordered.map((item) => ({
      order_outward_id: newOrderOutward.id,
      item_id: item.id,
      quantity: item.quantity
    }));

    // Create order outward items
    const newOrderOutwardItems =
      await OrderOutwardItemService.addOrderOutwardItemInBulk(listOfItems);

    if (!newOrderOutwardItems) {
      return res.status(404).json({
        status: 404,
        message: "Something went wrong while creating order outward items",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Order outward added",
      result: newOrderOutward
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", result: err });
  }
}

module.exports = {
  addOrderOutward
};
