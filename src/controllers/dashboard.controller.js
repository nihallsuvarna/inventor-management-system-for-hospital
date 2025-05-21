const DashboardService = require("../services/dashboard.service");

async function getUserDashboard(req, res) {
  try {
    const { userId } = req;
    // Get All the active Modules
    const activeModules = await DashboardService.getActiveModules(userId);

    return res.status(200).json({
      status: 200,
      message: "Dashboard fetched successfully",
      result: activeModules
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: error
    });
  }
}

module.exports = {
  getUserDashboard
};
