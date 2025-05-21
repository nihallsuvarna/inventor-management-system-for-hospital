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
          as: "module"
        }
      ]
    });
    return accessibleModules;
  }
}

module.exports = RoleManagementService;
