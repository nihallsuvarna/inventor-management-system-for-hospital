const { Permission } = require("../models");

class PermissionService {
  static async createPermission(permissionData) {
    try {
      const permission = await Permission.create(permissionData);
      return permission;
    } catch (error) {
      return error;
    }
  }

  static async getPermissionByRoleId(roleId) {
    try {
      const permission = await Permission.findAll({
        where: {
          role_id: roleId
        }
      });
      return permission;
    } catch (error) {
      return error;
    }
  }

  static async getPermissionByRoleIdAndModuleId(roleId, moduleId) {
    try {
      const permission = await Permission.findOne({
        where: {
          role_id: roleId,
          module_id: moduleId
        }
      });
      return permission;
    } catch (error) {
      return error;
    }
  }

  static async getPermissionByModuleId(moduleId) {
    try {
      const permission = await Permission.findAll({
        where: {
          module_id: moduleId
        }
      });
      return permission;
    } catch (error) {
      return error;
    }
  }

  static async getPermissionById(id) {
    try {
      const permission = await Permission.findByPk(id);
      return permission;
    } catch (error) {
      return error;
    }
  }

  static async listAllPermissions() {
    try {
      const permissions = await Permission.findAll();
      return permissions;
    } catch (error) {
      return error;
    }
  }

  static async updatePermission(id, permissionData) {
    try {
      const permission = await Permission.update(permissionData, {
        where: { id }
      });
      return permission;
    } catch (error) {
      return error;
    }
  }

  static async deletePermission(id) {
    try {
      const permission = await Permission.destroy({ where: { id } });
      return permission;
    } catch (error) {
      return error;
    }
  }
}

module.exports = PermissionService;
