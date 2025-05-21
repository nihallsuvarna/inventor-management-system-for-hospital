const { RoleService } = require("../../services");

async function listRole(req, res) {
  try {
    const role = await RoleService.listAllRoles();
    res.status(200).json({
      status: 200,
      message: "Roles retrieved successfully",
      result: role
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: error
    });
  }
}

module.exports = { listRole };
