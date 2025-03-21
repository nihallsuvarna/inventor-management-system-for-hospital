const { Op } = require("sequelize");
const { UserRole } = require("../models");

class UserRoleService {
  static async addUserRole(userId, roleId) {
    const userRole = await UserRole.create({
      user_id: userId,
      role_id: roleId
    });
    return userRole;
  }

  static async deleteUserRole(userId, roleId) {
    const userRole = await UserRole.destroy({
      where: { [Op.and]: [{ user_id: userId }, { role_id: roleId }] }
    });
    return userRole;
  }

  static async deleteUserRoleByUserId(userId) {
    const userRole = await UserRole.destroy({
      where: { user_id: userId }
    });
    return userRole;
  }

  static async deleteUserRoleByRoleId(roleId) {
    const userRole = await UserRole.destroy({
      where: { role_id: roleId }
    });
    return userRole;
  }

  static async getUserRoleByUserId(userId) {
    const userRole = await UserRole.findOne({
      where: { user_id: userId }
    });
    return userRole;
  }

  static async getUserRoleByRoleId(roleId) {
    const userRole = await UserRole.findOne({
      where: { role_id: roleId }
    });
    return userRole;
  }

  static async checkUserRoleByUserId(userId, roleId) {
    const userRole = await UserRole.findOne({
      where: { [Op.and]: [{ user_id: userId }, { role_id: roleId }] }
    });
    return userRole;
  }
 
}
module.exports = UserRoleService;
