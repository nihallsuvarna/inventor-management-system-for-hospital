const { Item } = require("../../models");

async function findItem(req, res) {
  try {
    const { label } = req.body;
    const item = await Item.findAll({ where: { label } });
    if (!item) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
        result: null
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Item found",
      result: item
    });
  } catch (err) {
    console.log("Something went wrong while getting Item", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting Item",
      result: err
    });
  }
}

module.exports = findItem;
