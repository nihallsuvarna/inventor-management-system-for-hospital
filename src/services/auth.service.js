const { Op } = require("sequelize");
const { User, UserRole, Session, Role } = require("../models");
const { generateOpaqueToken, compareWithCurrentTime } = require("../utils");
const bcrypt = require("bcrypt");

class AuthService {
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

  static async existingUserWithUsernameOrEmail(username, email) {
    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] }
    });
    return user;
  }

  static async checkUserRoleByUserId(userId, roleId) {
    const userRole = await UserRole.findOne({
      where: { [Op.and]: [{ user_id: userId }, { role_id: roleId }] }
    });
    return userRole;
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
    const role = await Role.findOne({ where: { key } });
    return role;
  }

  static async getRoleById(roleId) {
    const role = await Role.findOne({ where: { id: roleId } });
    return role;
  }

  static async deleteSession(sessionId) {
    const session = await Session.destroy({
      where: { token: sessionId }
    });
    return session;
  }

  static async checkUserSession(userId, type) {
    const session = await Session.findOne({
      where: { [Op.and]: [{ user_id: userId }, { type }] }
    });
    if (!session) {
      return null;
    }
    if (!compareWithCurrentTime(session.expiresAt)) {
      await Session.destroy({
        where: { id: session.id }
      });
      return null;
    }
    return session;
  }

  static async getUserSession(sessionId) {
    const session = await Session.findOne({
      where: { token: sessionId }
    });
    if (!session) {
      return null;
    } else if (!compareWithCurrentTime(session.expiresAt)) {
      return null;
    }
    return session;
  }

  static async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  static async updateUserPassword(userId, password) {
    const user = await User.update(
      { password },
      {
        where: { id: userId }
      }
    );
    return user;
  }

  static async checkUserPassword(userId, password) {
    const user = await User.findOne({
      where: { id: userId }
    });
    if (!user) {
      return null;
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    return isPasswordMatching;
  }
}

module.exports = AuthService;
