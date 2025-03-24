const { ItemsService, BatchService } = require("../../services");

async function addItem(req, res) {
  const {
    label,
    category_id,
    supplier_id,
    manufacturing_date,
    price,
    quantity,
    expire_date,
    location,
    in_store,
    batch_id
  } = req.body;

  if (
    !label ||
    !category_id ||
    !supplier_id ||
    !manufacturing_date ||
    !price ||
    !quantity ||
    !location ||
    !batch_id
  ) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
      result: null
    });
  }

  try {
    const item = await ItemsService.getItemByLabel(label);
    console.log(item, "item");

    if (item) {
      // check if batch exists
      const batch = await BatchService.getBatchByBatchId(batch_id);

      if (batch) {
        return res.status(404).json({
          status: 404,
          message: "Batch Already exists",
          result: batch
        });
      }

      const updateItem = await ItemsService.addItemByLabel(label, quantity);
      if (!updateItem) {
        return res.status(404).json({
          status: 404,
          message: "Item not found",
          result: null
        });
      }

      console.log(updateItem, "updateItem");

      const newBatch = await BatchService.createBatch({
        item_id: updateItem.id,
        batch_id,
        quantity,
        expire_date
      });

      if (!newBatch) {
        return res.status(404).json({
          status: 404,
          message: "Batch not found",
          result: null
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Item added",
        result: updateItem
      });
    } else {
      // check if batch exists
      const batch = await BatchService.getBatchByBatchId(batch_id);

      if (batch) {
        return res.status(404).json({
          status: 404,
          message: "Batch Already exists",
          result: batch
        });
      }

      const newItem = await ItemsService.createItem({
        label,
        category_id,
        supplier_id,
        manufacturing_date,
        price,
        quantity,
        location,
        in_store
      });
      if (!newItem) {
        return res.status(404).json({
          status: 404,
          message: "Item not found",
          result: null
        });
      }
      console.log(newItem, "newItem");
      const newBatch = await BatchService.createBatch({
        item_id: newItem.id,
        batch_id,
        quantity,
        expire_date
      });

      if (!newBatch) {
        return res.status(404).json({
          status: 404,
          message: "Batch not found",
          result: null
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Item added",
        result: newItem
      });
    }
  } catch (err) {
    console.log("Something went wrong while adding Item", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while adding Item",
      result: err
    });
  }
}

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
