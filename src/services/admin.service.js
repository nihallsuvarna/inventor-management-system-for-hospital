const { Op } = require("sequelize");
const { User, Session, Role, Department } = require("../models");
const { generateOpaqueToken } = require("../utils");

class AdminService {
  static async existingUserWithUsernameOrEmail(username, email) {
    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] }
    });
    return user;
  }
  static async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  static async createSession(userId, purpose) {
    const session = await Session.create({
      user_id: userId,
      token: generateOpaqueToken(),
      type: purpose,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
    });
    return session;
  }

  static async getRoleByKey(key) {
    const role = await Role.findOne({
      where: { key }
    });
    return role;
  }

  static async createRole(roleData) {
    const role = await Role.create(roleData);
    return role;
  }

  static async getDepartmentByKey(key) {
    const department = await Department.findOne({
      where: { key }
    });
    return department;
  }

  static async createDepartment(departmentData) {
    const department = await Department.create(departmentData);
    return department;
  }
}

module.exports = AdminService;
