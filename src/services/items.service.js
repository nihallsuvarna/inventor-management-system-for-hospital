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
