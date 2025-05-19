const { Op } = require("sequelize");
const { Session } = require("../models");
const { generateOpaqueToken, compareWithCurrentTime } = require("../utils");

class SessionService {
  static async createSession(userId, purpose) {
    const session = await Session.create({
      user_id: userId,
      token: generateOpaqueToken(),
      type: purpose,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
    });
    return session;
  }

  static async getSession(sessionId) {
    const session = await Session.findOne({ where: { session_id: sessionId } });
    return session;
  }

  static async getSessionByUserId(userId) {
    const session = await Session.findOne({ where: { user_id: userId } });
    return session;
  }

  static async checkSessionWithType(userId, type) {
    const session = await Session.findOne({
      where: { [Op.and]: [{ user_id: userId }, { type }] }
    });
    if (!session) {
      return null;
    }
    if (!compareWithCurrentTime(session.expiresAt)) {
      return null;
    }
    return session;
  }

  static async deleteSession(sessionId) {
    const session = await Session.destroy({
      where: { session_id: sessionId }
    });
    return session;
  }

  static async deleteSessionByType(userId, type) {
    const session = await Session.destroy({
      where: { [Op.and]: [{ user_id: userId }, { type }] }
    });
    return session;
  }
}
module.exports = SessionService;
