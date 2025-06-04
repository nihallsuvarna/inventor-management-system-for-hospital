const { ItemsService, BatchService } = require("../../services");


async function editItem(req, res) {
  const { itemId } = req.params;
  const { itemData } = req.body;
  try {
    const item = await ItemsService.updateItem(itemId, itemData);
    res.status(200).json({
      status: 200,
      message: "Item Updated Successfully",
      result: item
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: error
    });
  }
}

async function findItem(req, res) {
  try {
    const { label } = req.body;
    const item = await ItemsService.getItemByLabel(label);
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

module.exports = { addItem, editItem, findItem, listAllItems };
