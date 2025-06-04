const UserManagementService = require("../services/user-management.service");

async function getAllUsers(req, res) {
  try {
    const users = await UserManagementService.allUsers();
    return res.status(200).json({
      status: 200,
      message: "All users fetched successfully",
      result: users
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: err
    });
  }
}

async function getAllUsersWithRole(req, res) {
  const users = await UserManagementService.allUsersWithRole();
  return res.status(200).json({
    status: 200,
    message: "All users fetched successfully",
    result: users
  });
}

async function getAllRolesOfUser(req, res) {
  try {
    const userId = req.params.id;
    const roles = await UserManagementService.findUserRoleByUserId(userId);
    return res.status(200).json({
      status: 200,
      message: "All roles fetched successfully",
      result: roles
    });
  } catch (err) {
    console.log(err, "getAllRolesOfUser");
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: err
    });
  }
}

module.exports = { getAllUsers, getAllUsersWithRole, getAllRolesOfUser };
