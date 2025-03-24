const { Item } = require("../models");

class ItemsService {
  static async getItemById(itemId) {
    const item = await Item.findOne({ where: { id: itemId } });
    return item;
  }

  static async getItemByLabel(label) {
    const item = await Item.findOne({ where: { label } });
    return item;
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

  static async listAllItems() {
    const items = await Item.findAll();
    return items;
  }

  static async listAllItemsByAlphabetOrder(order) {
    const items = await Item.findAll({
      order: [["label", order]]
    });
    return items;
  }

  static async createItem(itemData) {
    const item = await Item.create(itemData);
    return item;
  }

  static async updateItem(itemId, itemData) {
    const item = await Item.update(itemData, {
      where: { id: itemId }
    });
    return item;
  }

  static async deleteItem(itemId) {
    const item = await Item.destroy({
      where: { id: itemId }
    });
    return item;
  }
}

module.exports = ItemsService;
