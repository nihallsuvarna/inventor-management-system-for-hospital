require("dotenv").config();
const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const validateEmail = require("../utils/validateEmail");
const { UserRole } = require("../models");

async function signIn(req, res) {
  const { username, password } = req.body;
  const { roleId } = req;

  // console.log(req, "req");

  // Check
  if (username.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "Username or password cannot be empty",
      result: ""
    });
  }

  // Check if user exits;
  const getUserData = await AuthService.existingUser(username);

  if (!getUserData) {
    return res.status(404).json({
      status: 401,
      message: "User does not exists",
      result: ""
    });
  }

  // Check if user has a active session
  const checkUserSession = await AuthService.checkUserSession(
    getUserData.id,
    "login"
  );
  console.log(checkUserSession, "checkUserSession");
  if (checkUserSession) {
    // Save Session in cookie
    res.cookie("access_token", checkUserSession.token, {
      userId: checkUserSession.user_id,
      roleId: roleId,
      expires: checkUserSession.expiresAt,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });

    req.userData = { userId: getUserData.id, roleId: roleId };
    return res.status(403).json({
      status: 403,
      message: "User already has an active session",
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

  const checkUserRole = await AuthService.checkUserRoleByUserId(
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
  const newSession = await AuthService.createSession(getUserData.id, "login");

  // Save Session in cookie
  res.cookie("access_token", newSession.token, {
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
    result: "Success",
    token: newSession.token
  });
}

async function signOut(req, res) {
  const { access_token } = req.cookies;

  if (!access_token) {
    return res.status(400).json({
      status: 400,
      message: "Session does not exists",
      result: ""
    });
  }
  const deleteSession = await AuthService.deleteSession(access_token);

  if (!deleteSession) {
    return res.status(400).json({
      status: 400,
      message: "Session does not exists",
      result: ""
    });
  }

  res.cookie("access_token", "", {
    userId: null,
    roleId: null,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  });
  return res.status(200).json({
    status: 200,
    message: "Session deleted successfully",
    result: null
  });
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

    const existingUser = await AuthService.existingUserWithUsernameOrEmail(
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
    const newUser = await AuthService.createUser({
      username,
      email,
      password: hashedPassword,
      department_id,
      address,
      contact
    });

    // Create Session
    const newSession = await AuthService.createSession(newUser.id, "register");

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

async function changePassword(req, res) {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // Check if user exists
    const user = await AuthService.existingUser(username);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        result: null
      });
    }

    // check if session exists
    const session = await AuthService.checkUserSession(user.id, "register");

    if (!session) {
      return res.status(403).json({
        status: 403,
        message: "Token does not exists",
        result: null
      });
    }

    // Check if old password is correct
    const isPasswordMatching = await AuthService.checkUserPassword(
      user.id,
      oldPassword
    );

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

    const hashPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT)
    );

    const updateUserPassword = await AuthService.updateUserPassword(
      user.id,
      hashPassword
    );

    if (!updateUserPassword) {
      return res.status(400).json({
        status: 400,
        message: "Password cannot be updated, Try again",
        result: null
      });
    }

    const removeSession = await AuthService.deleteSession(session.token);

    if (!removeSession) {
      return res.status(400).json({
        status: 400,
        message: "Session cannot be deleted, Try again",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Password changed successfully",
      result: updateUserPassword
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: err.message
    });
  }
}

module.exports = {
  signIn,
  signOut,
  register,
  changePassword
};
