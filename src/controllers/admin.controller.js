const { UserRole } = require("../models");
const { AdminService } = require("../services");
const bcrypt = require("bcrypt");
const validateEmail = require("../utils/validateEmail");

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

    const role = await AdminService.getRoleByKey(key);

    console.log(role, "role");

    if (role) {
      return res.status(403).json({
        status: 403,
        message: "The Key should be unique",
        result: null
      });
    }

    const newRole = await AdminService.createRole({
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

async function addDepartment(req, res) {
  try {
    const { label, key, description } = req.body;
    // check label
    if (label.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Label cannot be empty",
        result: null
      });
    }

    const departmentData = await AdminService.getDepartmentByKey(key);

    // Check if department key is exist
    if (departmentData) {
      return res.status(403).json({
        status: 403,
        message: "The Department should be unique",
        result: null
      });
    }

    // Add new Department
    const newDepartment = await AdminService.createDepartment({
      label,
      key,
      description
    });

    return res.status(201).json({
      status: 201,
      message: "Department Added Successfully",
      result: newDepartment
    });
  } catch (err) {
    console.log(err, "Something went wrong while adding department");
  }
}

module.exports = {
  addRole,
  addDepartment
};
