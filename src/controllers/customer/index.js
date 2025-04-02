const {
  UserService,
  UserRoleService,
  CustomerService
} = require("../../services");

async function addCustomer(req, res) {
  try {
    const {
      username,
      email,
      department_id,
      password,
      address,
      contact,
      role_id
    } = req.body;

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
    console.log(username, "username");
    console.log(email, "email");
    // Check if user exists
    const existingUser = await UserService.existingUserWithUsernameOrEmail(
      username,
      email
    );
    console.log(existingUser, "existingUser");
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

    const user = await UserService.createUser({
      username,
      email,
      department_id,
      password: hashedPassword,
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

async function getCustomer(req, res) {
  const { customerId } = req.body;
  const customer = await CustomerService.existingCustomer(customerId);
  return res.status(200).json({
    status: 200,
    message: "Customer fetched successfully",
    result: customer
  });
}

async function getAllCustomers(req, res) {
  const customers = await CustomerService.getAllCustomers();
  return res.status(200).json({
    status: 200,
    message: "All customers fetched successfully",
    result: customers
  });
}

module.exports = {
  addCustomer,
  getCustomer,
  getAllCustomers
};
