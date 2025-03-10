const { Item } = require("../../models");

async function addItem(req, res) {
  try {
    const {
      label,
      category_id,
      supplier_id,
      manufacturing_date,
      expire_date,
      location,
      quantity,
      price,
      in_store
    } = req.body;
    const item = await Item.create({
      label,
      category_id,
      supplier_id,
      quantity,
      price,
      manufacturing_date,
      expire_date,
      location,
      in_store
    });
    if (!item) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
        result: null
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Item added",
      result: item
    });
  } catch (err) {
    console.log("Something went wrong while adding Item", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while adding Item",
      result: err
    });
  }
}

module.exports = addItem;
