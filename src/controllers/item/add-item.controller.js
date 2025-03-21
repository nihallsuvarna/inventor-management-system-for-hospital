const { ItemsService } = require("../../services");

async function addItem(req, res) {
  try {
    const item = await ItemsService.createItem(req.body);
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
