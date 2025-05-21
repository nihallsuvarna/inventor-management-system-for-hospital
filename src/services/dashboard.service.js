const { Op } = require("sequelize");
const { Permission } = require("../models");

class DashboardService {
  static async getActiveModules(userId) {
    const activeModules = await Permission.findAll({
      where: {
        [Op.and]: [{ role_id: userId }, { isRead: true }]
      }
    });
    return activeModules;
  }
}

module.exports = DashboardService;
