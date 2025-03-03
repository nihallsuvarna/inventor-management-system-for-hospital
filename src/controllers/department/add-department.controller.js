const { Department } = require("../../models");

async function addDepartment(req, res) {
  try {
    const { label, key } = req.body;
    // check label
    if (label.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Label cannot be empty",
        result: null
      });
    }

    const departmentData = await Department.findOne({ where: { key: key } });
    // Check if department key is exist
    if (departmentData) {
      return res.status(403).json({
        status: 403,
        message: "The Department should be unique",
        result: null
      });
    }

    // Add new Department
    const newDepartment = new Department({
      ...req.body
    });

    newDepartment
      .save()
      .then((data) =>
        res.status(201).json({
          status: 201,
          message: "Department Added Successfully",
          result: data
        })
      )
      .catch((err) =>
        res.status(501).json({
          status: 501,
          message: "Something went wrong while adding department",
          result: err
        })
      );
  } catch (err) {
    console.log(err, "Something went wrong while adding department");
  }
}

module.exports = addDepartment;
