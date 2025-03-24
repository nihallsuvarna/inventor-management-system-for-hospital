const { OrderTypeService } = require("../../services");

async function addOrderType(req, res) {
  const { label, description, key } = req.body;

  // Check
  if (!label || !key) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if the order type already exists
    const orderType = await OrderTypeService.getOrderTypeByKey(key);

    if (orderType) {
      return res.status(400).json({ message: "Order type already exists" });
    }

    // Create order type
    const newOrderType = await OrderTypeService.addOrderType({
      label,
      description,
      key
    });

    return res.status(201).json({
      status: 201,
      message: "Order type created",
      result: newOrderType
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", result: err });
  }
}

async function listAllOrderTypes(req, res) {
  try {
    const orderTypes = await OrderTypeService.listAllOrderTypes();

    return res.status(200).json({
      status: 200,
      message: "Order types retrieved successfully",
      result: orderTypes
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", result: err });
  }
}

async function updateOrderType(req, res) {
  const id = req.params.id;
  const { label, description, key } = req.body;

  // Check
  if (!id || !order_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if the order type already exists
    const orderType = await OrderTypeService.getOrderTypeById(id);

    if (orderType) {
      return res.status(400).json({ message: "Order type already exists" });
    }

    // Create order type
    const newOrderType = await OrderTypeService.editOrderTypeById(
      id,
      order_type
    );

    return res.status(201).json({
      status: 201,
      message: "Order type updated",
      result: newOrderType
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", result: err });
  }
}

module.exports = {
  addOrderType,
  listAllOrderTypes,
  updateOrderType
};
