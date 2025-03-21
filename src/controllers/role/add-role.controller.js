const RoleService = require("../../services/role.service");

async function addRole(req, res) {
  try {
    const { label, description, key } = req.body;

    if (label.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "The Label cannot be empty",
        result: null
      });
    }

    if (key.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "The Role Key should be unique",
        result: null
      });
    }

    const role = await RoleService.getRoleByKey(key);

    console.log(role, "role");

    if (role) {
      return res.status(403).json({
        status: 403,
        message: "The Key should be unique",
        result: null
      });
    }

    const newRole = await RoleService.createRole({
      label,
      description,
      key
    });

    return res.status(200).json({
      status: 200,
      message: "Role added successfully",
      result: newRole
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong from server",
      result: err
    });
  }
}

module.exports = addRole;
