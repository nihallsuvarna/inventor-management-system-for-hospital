const { InventorManagementService } = require("../services");
const BatchService = require("../services/batch.service");

async function getAllInventors(req, res) {
  try {
    const inventors = await InventorManagementService.allInventors();
    if (!inventors) {
      return res.status(404).json({
        status: 404,
        message: "Inventors not found",
        result: null
      });
    }
    res.status(200).json({
      status: 200,
      message: "Inventors fetched successfully",
      result: inventors
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      result: error
    });
  }
}

async function getAllInventorsById(req, res) {
  const { id } = req.params;
  try {
    // check if inventor exists
    const inventor = await InventorManagementService.checkIfItemExistsById(id);
    if (!inventor) {
      return res.status(404).json({
        status: 404,
        message: "Inventor not found",
        result: null
      });
    }

    const items = await InventorManagementService.allInventorsById(id);

    if (!items) {
      return res.status(404).json({
        status: 404,
        message: "Inventor not found",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Inventor fetched successfully",
      result: items
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      result: error
    });
  }
}

async function getAllBatchDetails(req, res) {
  try {
    const batchDetails = await InventorManagementService.allBatchDetails();
    return res.status(200).json({
      status: 200,
      message: "Batch details fetched successfully",
      result: batchDetails
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      result: error
    });
  }
}

async function getAllBatchOfItem(req, res) {
  try {
    const itemId = req.params.id;

    // Check if item exists
    const item = await InventorManagementService.checkIfItemExistsById(itemId);
    if (!item) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
        result: null
      });
    }

    const batchDetails = await InventorManagementService.itemBatchDetails(
      itemId
    );

    if (!batchDetails) {
      return res.status(404).json({
        status: 404,
        message: "Batch details not found",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Batch details fetched successfully",
      result: batchDetails
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      result: error
    });
  }
}

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
    const item = await InventorManagementService.getItemByLabel(label);
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

      const updateItem = await InventorManagementService.addItemByLabel(
        label,
        quantity
      );
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
        expire_date,
        price
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

      const newItem = await InventorManagementService.createItem({
        label,
        category_id,
        supplier_id,
        manufacturing_date,
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
        expire_date,
        price
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

async function updateItem(req, res) {
  const { id } = req.params;

  // Check if item exists
  const item = await InventorManagementService.checkIfItemExistsById(id);
  if (!item) {
    return res.status(404).json({
      status: 404,
      message: "Item not found",
      result: null
    });
  }

  // check if body params are empty
  const {
    label,
    category_id,
    supplier_id,
    manufacturing_date,
    price,
    quantity,
    location,
    expire_date,
    batch_id
  } = req.body;

  if (
    !label ||
    !category_id ||
    !supplier_id ||
    !manufacturing_date ||
    !quantity ||
    !location ||
    !batch_id ||
    !price ||
    !expire_date
  ) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
      result: null
    });
  }

  try {
    const item = await InventorManagementService.updateItemById(id, req.body);
    if (!item) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
        result: null
      });
    }
    console.log(item, "item");

    return res.status(200).json({
      status: 200,
      message: "Item updated",
      result: item
    });
  } catch (err) {
    console.log("Something went wrong while updating Item", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while updating Item",
      result: err
    });
  }
}

module.exports = {
  getAllInventors,
  getAllInventorsById,
  getAllBatchDetails,
  getAllBatchOfItem,
  addItem,
  updateItem
};
