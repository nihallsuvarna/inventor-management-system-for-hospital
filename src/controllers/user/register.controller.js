const bcrypt = require("bcrypt");
require("dotenv").config();
const { User, Session, UserRole } = require("../../models");
const { generateOpaqueToken } = require("../../utils");
const { Op } = require("sequelize");
const UserService = require("../../services/user.service");

async function register(req, res) {
  try {
    const { username, email, department_id, password, address, contact, role } =
      req.body;

    if (username.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "User name cannot be empty",
        result: null
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 400,
        message: "Email is invalid",
        result: null
      });
    }

    const existingUser = await UserService.existingUserWithUsernameOrEmail(
      username,
      email
    );

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
        result: null
      });
    }

    // Hash the password
    const saltRounds = parseInt(process.env.SALT, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new User
    const newUser = await UserService.createUser({
      username,
      email,
      password: hashedPassword,
      department_id,
      address,
      contact
    });

    // Create Session
    const newSession = await SessionService.createSession(
      newUser.id,
      "register"
    );

    // Assign role to user
    if (role && role.length > 0) {
      const userRoles = role.map((roleId) => ({
        user_id: newUser.id,
        role_id: roleId
      }));

      await UserRole.bulkCreate(userRoles);
    }

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      result: { user: newUser, session: newSession }
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: err.message
    });
  }
}

function validateEmail(email) {
  // Regular expression for validating an email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = register;
