const { Role } = require("../../models");

async function addRole(req, res) {
  try {
    const { label, description, key } = req.body;

    console.log(label, "label");
    console.log(description, "description");
    console.log(key, "key");

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

    const role = await Role.findOne({ where: { key: key } });

    console.log(role, "role");

    if (role) {
      return res.status(403).json({
        status: 403,
        message: "The Key should be unique",
        result: null
      });
    }

    const newRole = new Role({ label, description, key });

    newRole
      .save()
      .then(() =>
        res.status(201).json({
          status: 201,
          message: "Role saved successfully",
          result: null
        })
      )
      .catch((err) =>
        res.status(501).json({
          status: 501,
          message: "Something went wrong while saving",
          result: err
        })
      );
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
