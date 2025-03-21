const bcrypt = require("bcrypt");
const {
  SessionService,
  UserService,
  UserRoleService
} = require("../../services");

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

module.exports = signIn;
