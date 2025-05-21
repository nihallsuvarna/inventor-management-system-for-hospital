const authRoute = require("./auth.route");
const adminRoute = require("./admin.route");
const dashboardRoute = require("./dashboard.route");
const userManagementRoute = require("./user-management.route");
const roleManagementRoute = require("./role-management.route");

module.exports = {
  authRoute,
  dashboardRoute,
  userManagementRoute,
  roleManagementRoute
};
