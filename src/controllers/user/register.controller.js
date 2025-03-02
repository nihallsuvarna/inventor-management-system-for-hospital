const { User } = require("../../models");

async function register(req, res) {
  try {
    const { username, email } = req.body;

    if (username.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "User name cannot be empty",
        result: ""
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 400,
        message: "Email is invalid",
        result: ""
      });
    }

    const getUserData = await User.findOne({ username });

    if (getUserData) {
      return res.status(400).json({
        status: 400,
        message: "Username already exits",
        result: ""
      });
    }

    if (getUserData.email === email) {
      return res.status(400).json({
        status: 400,
        message: "Email already exits",
        result: ""
      });
    }

    const newUser = new User({
      ...req
    });

    newUser
      .save()
      .then(() =>
        res.status(201).json({
          status: 201,
          message: "User added successfully",
          result: ""
        })
      )
      .catch((err) =>
        res.status(501).json({
          status: 501,
          message: "Something went wrong",
          result: err
        })
      );
  } catch (err) {
    res.status(501).json({
      status: 501,
      message: "Something went wrong",
      result: err
    });
  }
}

function validateEmail(email) {
  // Regular expression for validating an email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = register;
