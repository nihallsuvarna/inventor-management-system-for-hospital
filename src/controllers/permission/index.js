const {
  PermissionService,
  ModuleService,
  RoleService
} = require("../../services");

async function addPermission(req, res) {
  const { module_id, role_id, isRead, isUpdate, isWrite, isDelete } = req.body;

  try {
    const module = await ModuleService.getModuleById(module_id);

    if (!module) {
      return res.status(404).json({
        status: 404,
        message: "Module not found",
        result: null
      });
    }

    const role = await RoleService.getRoleById(role_id);

    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
        result: null
      });
    }

    // Check if the permission already exists for the given module and role
    const existingPermission =
      await PermissionService.getPermissionByRoleIdAndModuleId(
        role_id,
        module_id
      );

    if (existingPermission) {
      return res.status(409).json({
        status: 409,
        message: "Permission already exists for the given module and role",
        result: null
      });
    }

    const permission = await PermissionService.createPermission({
      module_id,
      role_id,
      isRead,
      isUpdate,
      isWrite,
      isDelete
    });

    res.status(200).json({
      status: 200,
      message: "Permission added",
      result: permission
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

async function getPermissionByRoleId(req, res) {
  const { role_id } = req.params;

  try {
    const ifRoleExists = await RoleService.getRoleById(role_id);

    if (!ifRoleExists) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
        result: null
      });
    }

    const permission = await PermissionService.getPermissionByRoleId(role_id);

    if (!permission) {
      return res.status(404).json({
        status: 404,
        message: "Permission not found",
        result: null
      });
    }

    res.status(200).json({
      status: 200,
      message: "Permission found successfully",
      result: permission
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

async function listAllPermissions(req, res) {
  try {
    const permission = await PermissionService.listAllPermissions();

    if (!permission) {
      return res.status(404).json({
        status: 404,
        message: "Permission not found",
        result: null
      });
    }

    res.status(200).json({
      status: 200,
      message: "Permission found successfully",
      result: permission
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

async function updatePermission(req, res) {
  const { id } = req.params;

  try {
    // Check if the permission already exists for the given module and role
    const permission = await PermissionService.getPermissionById(id);

    if (!permission) {
      return res.status(404).json({
        status: 404,
        message: "Permission not found",
        result: null
      });
    }

    const updatedPermission = await PermissionService.updatePermission(
      id,
      req.body
    );

    if (!updatedPermission) {
      return res.status(404).json({
        status: 404,
        message: "Permission not found",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Permission updated successfully",
      result: updatedPermission
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
  addPermission,
  getPermissionByRoleId,
  listAllPermissions,
  updatePermission
};
