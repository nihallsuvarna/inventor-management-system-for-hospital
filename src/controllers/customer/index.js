const { UserService, UserRoleService } = require("../../services");

async function addCustomer(req, res) {
  try {
    const { username, email, address, contact, role_id } = req.body;

    if (username.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "The Name cannot be empty",
        result: null
      });
    }

    if (email.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "The Email cannot be empty",
        result: null
      });
    }

    if (address.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "The Address cannot be empty",
        result: null
      });
    }

    const user = await UserService.createUser({
      username,
      email,
      department_id,
      address,
      contact
    });

    const addUserRole = await UserRoleService.addUserRole({
      user_id: user.id,
      role_id: role_id
    });

    if (!addUserRole) {
      return res.status(404).json({
        status: 404,
        message: "Something went wrong while creating user",
        result: null
      });
    }

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Something went wrong while creating user",
        result: null
      });
    }

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      result: user
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

module.exports = {
  addCustomer
};
