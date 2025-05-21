const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { User, UserRole } = require("../models");

class UserService {
  static async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  static async existingUser(username) {
    const user = await User.findOne({ where: { username } });
    return user;
  }

  static async existingUserWithEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async existingUserWithId(userId) {
    const user = await User.findOne({ where: { id: userId } });
    return user;
  }


  static async existingUserWithRole(username, roleId) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    const userRole = await UserRole.findOne({
      where: { user_id: user.id }
    });
    if (!userRole) {
      return null;
    }
    if (userRole.role_id !== roleId) {
      return null;
    }
    return user;
  }


  static async updateUser(userId, userData) {
    const user = await User.update(userData, {
      where: { id: userId }
    });
    return user;
  }

  static async deleteUser(userId) {
    const user = await User.destroy({
      where: { id: userId }
    });
    return user;
  }

  static async checkOldPassword(username, oldPassword) {
    const user = await User.findOne({
      where: { username }
    });
    if (!user) {
      return null;
    }
    const isPasswordMatching = await bcrypt.compare(oldPassword, user.password);
    return isPasswordMatching;
  }
}

module.exports = UserService;
