const { OrderOutward } = require("../models");

class OrderOutwardService {
  static async addOrderOutward(orderOutward) {
    return await OrderOutward.create(orderOutward);
  }

  static async getOrderOutwardById(id) {
    return await OrderOutward.findOne({
      where: {
        id: id
      }
    });
  }

  static async listAllOrderOutwards() {
    return await OrderOutward.findAll();
  }

  static async editOrderOutwardById(id, orderOutward) {
    return await OrderOutward.update(orderOutward, {
      where: {
        id: id
      }
    });
  }
}

module.exports = OrderOutwardService;
