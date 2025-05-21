const { Op } = require("sequelize");
const { Role, Permission, Module } = require("../models");

class RoleManagementService {
  static async allRoles() {
    return await Role.findAll();
  }
  static async checkIfRoleExistsByKey(key) {
    const role = await Role.findOne({ where: { key } });
    return role;
  }

  static async createRole(roleData) {
    const role = await Role.create(roleData);
    return role;
  }

  static async putRole(roleData, id) {
    const role = await Role.update(roleData, { where: { id } });
    return role;
  }

  static async checkIfRoleExistsById(id) {
    const role = await Role.findOne({ where: { id } });
    return role;
  }
  static async deleteRole(id) {
    const role = await Role.destroy({ where: { id } });
    return role;
  }

  static async accessibleModulesByRole(roleId) {
    const accessibleModules = await Permission.findAll({
      where: {
        role_id: roleId
      },
      include: [
        {
          model: Module,
          as: "module",
          attributes: ["label", "key", "description"]
        }
      ]
    });
    return accessibleModules;
  }

  static async checkIfModuleExistsById(id) {
    const module = await Module.findOne({ where: { id } });
    return module;
  }

  static async createNewPermission(
    roleId,
    moduleId,
    isRead,
    isWrite,
    isUpdate,
    isDelete
  ) {
    const permission = await Permission.create({
      role_id: roleId,
      module_id: moduleId,
      isRead,
      isWrite,
      isUpdate,
      isDelete
    });
    return permission;
  }

  static async checkIfPermissionExists(roleId, moduleId) {
    const permission = await Permission.findOne({
      where: { [Op.and]: [{ role_id: roleId }, { module_id: moduleId }] }
    });
    return permission;
  }
}

module.exports = RoleManagementService;
