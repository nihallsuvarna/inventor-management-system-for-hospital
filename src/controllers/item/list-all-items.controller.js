const { ItemsService } = require("../../services");

async function listAllItems(req, res) {
  console.log("object");
  try {
    const items = await ItemsService.listAllItemsByAlphabetOrder("ASC");
    if (!items) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
        result: null
      });
    }
    return res.status(200).json({
      status: 200,
      message: "All Items found",
      result: items
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

module.exports = listAllItems;
