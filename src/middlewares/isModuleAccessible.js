const { Permission, Module } = require("../models");
const { AuthService } = require("../services");

function isModuleAccessible(moduleName, type) {
  return async (req, res, next) => {
    const { access_token } = req.cookies;
    const { roleId } = req;

    if (!access_token) {
      return res.status(401).json({
        status: 401,
        message: "Authentication required",
        result: ""
      });
    }

    const decode = await AuthService.getUserSession(access_token);

    if (!decode) {
      return res.status(401).json({
        status: 401,
        message: "Authentication required",
        result: ""
      });
    }

    req.userId = decode.user_id;

    // Get the Module Id
    const module = await Module.findOne({
      where: {
        key: moduleName
      }
    });

    if (!module) {
      return res.status(404).json({
        status: 404,
        message: "Module not found",
        result: null
      });
    }

    const checkPermission = await Permission.findOne({
      where: {
        role_id: roleId,
        module_id: module.id
      }
    });

    if (!checkPermission) {
      return res.status(403).json({
        status: 403,
        message: "Permission Not Found",
        result: null
      });
    }

    if (!checkPermission[type]) {
      return res.status(403).json({
        status: 403,
        message: "Permission denied",
        result: null
      });
    }

    next();
  };
}

module.exports = isModuleAccessible;
