const { DepartmentService } = require("../../services");

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

    const departmentData = await DepartmentService.getDepartmentByKey(key);

    // Check if department key is exist
    if (departmentData) {
      return res.status(403).json({
        status: 403,
        message: "The Department should be unique",
        result: null
      });
    }

    // Add new Department
    const newDepartment = await DepartmentService.createDepartment({
      label,
      key
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

module.exports = addDepartment;
