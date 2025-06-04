const { RoleManagementService } = require("../services");

async function getAllRoles(req, res) {
  try {
    const roles = await RoleManagementService.allRoles();
    return res.status(200).json({
      status: 200,
      message: "Roles fetched successfully",
      result: roles
    });
  } catch (err) {
    console.log(err, "Something went wrong while getting roles");
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting roles",
      result: err
    });
  }
}

async function createRole(req, res) {
  try {
    const { label, key } = req.body;

    if (label.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Label cannot be empty",
        result: null
      });
    }

    if (key.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Key cannot be empty",
        result: null
      });
    }

    // Check if role already exists
    const existingRole = await RoleManagementService.checkIfRoleExistsByKey(
      key
    );

    if (existingRole) {
      return res.status(400).json({
        status: 400,
        message: "Role already exists",
        result: null
      });
    }

    const newRole = await RoleManagementService.createRole(req.body);

    if (!newRole) {
      return res.status(400).json({
        status: 400,
        message: "Role cannot be created",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Role created successfully",
      result: newRole
    });
  } catch (err) {
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while creating role",
      result: err
    });
  }
}

async function updateRole(req, res) {
  const { id } = req.params;
  const { label } = req.body;

  console.log(id, label, "id and label");

  if (label.trim() === "") {
    return res.status(400).json({
      status: 400,
      message: "Label cannot be empty",
      result: null
    });
  }

  // Check if role already exists
  const existingRole = await RoleManagementService.checkIfRoleExistsById(id);

  if (!existingRole) {
    return res.status(400).json({
      status: 400,
      message: "Role does not exist",
      result: null
    });
  }

  const role = await RoleManagementService.putRole(req.body, id);

  if (!role) {
    return res.status(400).json({
      status: 400,
      message: "Role cannot be updated",
      result: null
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Role updated successfully",
    result: role
  });
}

async function removeRole(req, res) {
  const { id } = req.params;

  // Check if role already exists
  const existingRole = await RoleManagementService.checkIfRoleExistsById(id);

  if (!existingRole) {
    return res.status(400).json({
      status: 400,
      message: "Role does not exist",
      result: null
    });
  }
  const role = await RoleManagementService.deleteRole(id);

  if (!role) {
    return res.status(400).json({
      status: 400,
      message: "Role cannot be deleted",
      result: null
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Role deleted successfully",
    result: role
  });
}

async function getModulesAccessibleByRole(req, res) {
  try {
    const { id } = req.params;

    // Check if role already exists
    const existingRole = await RoleManagementService.checkIfRoleExistsById(id);

    if (!existingRole) {
      return res.status(400).json({
        status: 400,
        message: "Role does not exist",
        result: null
      });
    }

    const modules = await RoleManagementService.accessibleModulesByRole(id);

    if (!modules) {
      return res.status(400).json({
        status: 400,
        message: "Modules cannot be fetched",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Modules fetched successfully",
      result: modules
    });
  } catch (err) {
    console.log(err, "Something went wrong while getting modules");
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting modules",
      result: err
    });
  }
}

async function assignModuleToRole(req, res) {
  try {
    const { id } = req.params;
    const { module_id, isRead, isWrite, isUpdate, isDelete } = req.body;

    // check if role exists
    const role = await RoleManagementService.checkIfRoleExistsById(id);
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
        result: null
      });
    }

    const module = await RoleManagementService.checkIfModuleExistsById(
      module_id
    );
    if (!module) {
      return res.status(404).json({
        status: 404,
        message: "Module not found",
        result: null
      });
    }

    // check if permission already exists
    const permission = await RoleManagementService.checkIfPermissionExists(
      id,
      module_id
    );
    if (permission) {
      return res.status(400).json({
        status: 400,
        message: "Permission already exists",
        result: null
      });
    }

    const newPermission = await RoleManagementService.createNewPermission(
      id,
      module_id,
      isRead,
      isWrite,
      isUpdate,
      isDelete
    );

    if (!newPermission) {
      return res.status(400).json({
        status: 400,
        message: "Permission cannot be updated",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Permission updated successfully",
      result: newPermission
    });
  } catch (err) {
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while assigning module to role",
      result: err
    });
  }
}

async function getAllUsersOfRole(req, res) {
  try {
    const { id } = req.params;

    // Check if role already exists
    const existingRole = await RoleManagementService.checkIfRoleExistsById(id);

    if (!existingRole) {
      return res.status(400).json({
        status: 400,
        message: "Role does not exist",
        result: null
      });
    }

    const users = await RoleManagementService.allUsersOfRole(id);

    if (!users) {
      return res.status(400).json({
        status: 400,
        message: "Users cannot be fetched",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Users fetched successfully",
      result: users
    });
  } catch (err) {
    console.log(err, "Something went wrong while getting users of role");
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting users of role",
      result: err
    });
  }
}

module.exports = {
  getAllRoles,
  createRole,
  updateRole,
  removeRole,
  getModulesAccessibleByRole,
  assignModuleToRole,
  getAllUsersOfRole
};
