const { Item, Category, Supplier, Batch } = require("../models");

class InventorManagementService {
  static async allInventors() {
    const inventors = await Item.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["label", "key", "description"]
        },
        {
          model: Supplier,
          as: "supplier",
          attributes: ["label", "contact_info"]
        },
        {
          model: Batch,
          as: "batch",
          attributes: ["batch_id", "quantity", "expire_date"]
        }
      ]
    });
    return inventors;
  }

  static async allBatchDetails() {
    const batchDetails = await Batch.findAll();
    return batchDetails;
  }

  static async checkIfItemExistsById(id) {
    const item = await Item.findByPk(id);
    return item;
  }

  static async itemBatchDetails(id) {
    const batchDetails = await Batch.findAll({
      where: {
        item_id: id
      }
    });
    return batchDetails;
  }

  static getItemByLabel(label) {
    return Item.findOne({
      where: {
        label
      }
    });
  }

  static async addItemByLabel(label, itemQuantity) {
    const item = await Item.findOne({ where: { label } });

    if (!item) {
      throw new Error("Item not found");
    }

    const quantity = item.quantity + itemQuantity;

    const [updatedRows] = await Item.update(
      { quantity: quantity },
      {
        where: { label }
      }
    );

    if (!updatedRows) {
      throw new Error("Item update failed");
    }

    return await Item.findOne({ where: { label } });
  }

  static async createItem(itemData) {
    const item = await Item.create(itemData);
    return item;
  }
}

module.exports = InventorManagementService;
