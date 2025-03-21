const { Role } = require("../models");

class RoleService {
  static async getRoleById(roleId) {
    const role = await Role.findOne({ where: { id: roleId } });
    return role;
  }

  static async getRoleByKey(key) {
    const role = await Role.findOne({ where: { key } });
    return role;
  }

  static async listAllRoles() {
    const roles = await Role.findAll();
    return roles;
  }

  static async createRole(roleData) {
    const role = await Role.create(roleData);
    return role;
  }

  static async updateRole(roleId, roleData) {
    const role = await Role.update(roleData, {
      where: { id: roleId }
    });
    return role;
  }

  static async deleteRole(roleId) {
    const role = await Role.destroy({
      where: { id: roleId }
    });
    return role;
  }
}

module.exports = RoleService;
