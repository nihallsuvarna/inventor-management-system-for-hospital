const { OrderType } = require("../models");

class OrderTypeService {
  static async addOrderType(orderType) {
    return await OrderType.create(orderType);
  }

  static async getOrderTypeById(id) {
    return await OrderType.findOne({
      where: {
        id: id
      }
    });
  }

  static async listAllOrderTypes() {
    return await OrderType.findAll();
  }

  static async editOrderTypeById(id, orderType) {
    return await OrderType.update(orderType, {
      where: {
        id: id
      }
    });
  }

  static async deleteOrderTypeById(id) {
    return await OrderType.destroy({
      where: {
        id: id
      }
    });
  }

  static async getOrderTypeByKey(key) {
    return await OrderType.findOne({
      where: {
        key: key
      }
    });
  }

  static async getOrderTypeByLabel(label) {
    return await OrderType.findOne({
      where: {
        label: label
      }
    });
  }
}

module.exports = OrderTypeService;
