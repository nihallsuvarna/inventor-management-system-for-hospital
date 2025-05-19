const bcrypt = require("bcrypt");
require("dotenv").config();
const {
  UserService,
  SessionService,
  UserRoleService
} = require("../../services");
const { compareWithCurrentTime } = require("../../utils");
const { UserRole } = require("../../models");

async function changePassword(req, res) {
  try {
    const { username, oldPassword, newPassword } = req.body;
    console.log("14", req.body);
    // check the inputs
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
        result: null
      });
    }

    const user = await UserService.existingUser(username);
    console.log("15", user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        result: null
      });
    }
    console.log("16", user);
    // Check if user old password is correct
    if (!(await UserService.checkOldPassword(username, oldPassword))) {
      return res.status(401).json({
        status: 401,
        message: "Incorrect old password"
      });
    }

    // compare old password
    const isPasswordMatching = await bcrypt.compare(oldPassword, user.password);
    console.log("17", isPasswordMatching);
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
    console.log("18", session);
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
    console.log("19", session);
    // Hash new password
    const salted = parseInt(process.env.SALT, 10) || 10;
    const hashPassword = await bcrypt.hash(newPassword, salted);
    // Update Password
    await user.update({ password: hashPassword });

    // Remove old sessions
    await SessionService.deleteSessionByType(user.id, "register");
    console.log("20", user);
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

async function signIn(req, res) {
  const { username, password, roleId } = req.body;

  console.log(req.body, "req.body");

  // Check
  if (username.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "Username or password cannot be empty",
      result: ""
    });
  }

  // Check if user exits;
  const getUserData = await UserService.existingUser(username);

  if (!getUserData) {
    return res.status(404).json({
      status: 401,
      message: "User does not exists",
      result: ""
    });
  }

  const comparePassword = await bcrypt.compare(password, getUserData.password);

  if (!comparePassword) {
    return res.status(403).json({
      status: 403,
      message: "Password does not match",
      result: ""
    });
  }

  // Check User role
  console.log(roleId, "roleId");
  const checkUserRole = await UserRoleService.checkUserRoleByUserId(
    getUserData.id,
    roleId
  );

  if (!checkUserRole) {
    return res.status(403).json({
      status: 403,
      message: "User does not have the required role",
      result: ""
    });
  }

  // Create Session
  const newSession = await SessionService.createSession(
    getUserData.id,
    "login"
  );

  // Save Session in cookie
  res.cookie("session", newSession.token, {
    userId: getUserData.id,
    roleId: roleId,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  });

  req.userData = { userId: getUserData.id, roleId: roleId };

  return res.status(200).json({
    status: 200,
    message: "User signed in successfully",
    result: "Success"
  });
}

async function getUser(req, res) {
  const { userId } = req.userData;
  const user = await UserService.existingUserWithId(userId);
  return res.status(200).json({
    status: 200,
    message: "User fetched successfully",
    result: user
  });
}

async function getAllUsers(req, res) {
  const users = await UserService.getAllUsers();
  return res.status(200).json({
    status: 200,
    message: "All users fetched successfully",
    result: users
  });
}

function validateEmail(email) {
  // Regular expression for validating an email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = { signIn, register, changePassword, getAllUsers, getUser };
