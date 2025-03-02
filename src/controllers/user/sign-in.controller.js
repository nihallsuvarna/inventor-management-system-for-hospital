const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, UserRole } = require("../../models");

async function signIn(req, res) {
  const { username, password, role } = req.body;

  // Check
  if (username.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "Username or password cannot be empty",
      result: ""
    });
  }

  // Check if user exits
  const getUserData = await User.findOne({ username });

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
  const getUserRole = await UserRole.findOne({ user_id: getUserData.id });

  const token = jwt.sign({
    id: getUserData.id,
    username: getUserData.username,
    role: getUserData.role
  });
}

module.exports = signIn;
