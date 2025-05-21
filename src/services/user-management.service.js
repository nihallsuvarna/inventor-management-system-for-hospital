const { User, UserRole, Role } = require("../models");

class UserManagementService {
  static async allUsers() {
    return await User.findAll();
  }

  static async allUsersWithRole() {
    const users = await User.findAll({
      include: {
        model: UserRole,
        include: [Role]
      }
    });

    return users;
  }
}

module.exports = UserManagementService;
