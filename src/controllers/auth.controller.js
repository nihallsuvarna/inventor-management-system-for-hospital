const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");

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

async function register(req, res) {}

module.exports = {
  signIn,
  signOut,
  register
};
