const express = require("express");
const {
  getAllInventors,
  getAllBatchDetails,
  getAllBatchOfItem,
  getAllInventorsById,
  addItem,
  updateItem
} = require("../controllers/inventor-management.controller");
const { auth, authRole, isModuleAccessible } = require("../middlewares");

const router = express.Router();

//GET /items: Get all items.
router.get(
  "/items",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isRead"),
  getAllInventors
);

// GET /items/:id: Get a single item by ID.
router.get(
  "/items/:id",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isRead"),
  getAllInventorsById
);

// POST /items: Create a new item.
router.post(
  "/items",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isWrite"),
  addItem
);

// PUT /items/:id: Update an item by ID
router.put(
  "/items/:id",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isWrite"),
  updateItem
);

// DELETE /items/:id: Delete an item by ID.
router.delete(
  "/items/:id",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isWrite"),
  deleteItem
);

// GET /items/category/:categoryId: Get items by category.

// GET /items/supplier/:supplierId: Get items by supplier.

// GET /batches: Get all batches.

// GET /batches/:id: Get a single batch by ID.

// POST /batches: Create a new batch.

// PUT /batches/:id: Update a batch by ID.

// DELETE /batches/:id: Delete a batch by ID.

// GET /batches/item/:itemId: Get batches for a specific item.

// GET /batches/expired: Get all expired batches.

// Order Types
// GET /orderTypes: Get all order types.

// GET /orderTypes/:id: Get a single order type by ID.

// POST /orderTypes: Create a new order type.

// PUT /orderTypes/:id: Update an order type by ID.

// DELETE /orderTypes/:id: Delete an order type by ID.

router.get(
  "/inventor/get-all-batch",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isRead"),
  getAllBatchDetails
);

router.get(
  "/inventor/get-all-batch/:id",
  auth,
  authRole,
  isModuleAccessible("inventor-management", "isRead"),
  getAllBatchOfItem
);

module.exports = router;
