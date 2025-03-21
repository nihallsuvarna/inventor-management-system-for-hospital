const bcrypt = require("bcrypt");
require("dotenv").config();
const { User, Session } = require("../../models");
const { UserService, SessionService } = require("../../services");
const { Op, where } = require("sequelize");
const { compareWithCurrentTime } = require("../../utils");

async function changePassword(req, res) {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // check the inputs
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
        result: null
      });
    }

    const user = await UserService.existingUser(username);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        result: null
      });
    }

    // Check if user old password is correct
    if (!(await UserService.checkOldPassword(username, oldPassword))) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect old password"
      });
    }

    // compare old password
    const isPasswordMatching = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatching) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect old password"
      });
    }

    // valid length of password
    if (newPassword.length < 8) {
      return res.status(400).json({
        status: 400,
        message: "Password should be minimum of 8 length",
        result: null
      });
    }

    // check if session exists
    const session = await SessionService.checkSessionWithType(
      user.id,
      "register"
    );

    if (!session) {
      return res.status(403).json({
        status: 403,
        message: "Token does not exists",
        result: null
      });
    }

    if (!compareWithCurrentTime(session.expiresAt)) {
      return res.status(401).json({
        status: 401,
        message: "Token as expired",
        return: null
      });
    }

    // Hash new password
    const salted = parseInt(process.env.SALT, 10) || 10;
    const hashPassword = await bcrypt.hash(newPassword, salted);
    // Update Password
    await user.update({ password: hashPassword });

    // Remove old sessions
    await SessionService.deleteSessionByType(user.id, "register");

    return res.status(200).json({
      status: 200,
      message: "Password Changed successfully",
      result: null
    });
  } catch (err) {
    console.log(err, "Something went wrong while changing password");
    return res.status(500).json({
      status: 500,
      message: "Something went wrong while changing password",
      result: err
    });
  }
}

module.exports = changePassword;
