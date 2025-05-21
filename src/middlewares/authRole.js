const { AuthService } = require("../services");

async function authRole(req, res, next) {
  const roleKey = req.originalUrl.split("/")[1];

  const checkIfExists = await AuthService.getRoleByKey(roleKey);
  if (!checkIfExists) {
    return res.status(404).json({
      status: 404,
      message: "Role not found",
      result: null
    });
  }

  const role = await AuthService.getRoleById(checkIfExists.id);
  req.roleId = role.id;
  return next();
}

module.exports = authRole;
