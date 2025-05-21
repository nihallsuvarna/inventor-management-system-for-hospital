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
}

module.exports = InventorManagementService;
