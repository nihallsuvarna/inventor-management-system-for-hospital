const { User, UserRole, Role } = require("../models");

class UserManagementService {
  static async allUsers() {
    return await User.findAll();
  }

  static async allUsersWithRole() {
    const users = await User.findAll({
      include: {
        model: UserRole,
        include: {
          model: Role,
          as: "roles",
        }
      }
    });

    return users;
  }

  static async findUserRoleByUserId(userId) {
    return await UserRole.findAll({
      where: {
        user_id: userId
      },
      include: {
        model: Role,
        as: "roles",
      }
    });
  }
}

module.exports = UserManagementService;
