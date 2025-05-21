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

module.exports = { getAllUsers, getAllUsersWithRole }; 
