const { UserRole } = require("../models");
const { AdminService } = require("../services");
const bcrypt = require("bcrypt");
const validateEmail = require("../utils/validateEmail");

async function register(req, res) {
  try {
    const { username, email, department_id, password, address, contact, role } =
      req.body;

    if (username.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "User name cannot be empty",
        result: null
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 400,
        message: "Email is invalid",
        result: null
      });
    }

    const existingUser = await AdminService.existingUserWithUsernameOrEmail(
      username,
      email
    );

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
        result: null
      });
    }

    // Hash the password
    const saltRounds = parseInt(process.env.SALT, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new User
    const newUser = await AdminService.createUser({
      username,
      email,
      password: hashedPassword,
      department_id,
      address,
      contact
    });

    // Create Session
    const newSession = await AdminService.createSession(newUser.id, "register");

    // Assign role to user
    if (role && role.length > 0) {
      const userRoles = role.map((roleId) => ({
        user_id: newUser.id,
        role_id: roleId
      }));

      await UserRole.bulkCreate(userRoles);
    }

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      result: { user: newUser, session: newSession }
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      result: err.message
    });
  }
}

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
  register,
  addRole,
  addDepartment
};
