const { OrderOutwardItem } = require("../models");

class OrderOutwardItemService {
  static async addOrderOutwardItemInBulk(arrayOfItems) {
    return await OrderOutwardItem.bulkCreate(arrayOfItems);
  }

  static async addOrderOutwardItem(orderOutwardItem) {
    return await OrderOutwardItem.create(orderOutwardItem);
  }

  static async getOrderOutwardItemById(id) {
    return await OrderOutwardItem.findOne({
      where: {
        id: id
      }
    });
  }

  static async listOrderOutwardItemByOrderOutwardId(orderOutwardId) {
    return await OrderOutwardItem.findAll({
      where: {
        order_outward_id: orderOutwardId
      }
    });
  }

  static async listAllOrderOutwardItems() {
    return await OrderOutwardItem.findAll();
  }

  static async listOrderOutwardItemByItemId(itemId) {
    return await OrderOutwardItem.findAll({
      where: {
        item_id: itemId
      }
    });
  }
}

module.exports = OrderOutwardItemService;
