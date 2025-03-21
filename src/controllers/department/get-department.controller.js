const { DepartmentService } = require("../../services");

async function getDepartment(req, res) {
  try {
    const allDepartment = await DepartmentService.listAllDepartments();

    if (!allDepartment) {
      return res.status(404).json({
        status: 404,
        message: "Department not found",
        result: null
      });
    }

    res.status(200).json({
      status: 200,
      message: "Department found successfully",
      result: allDepartment
    });
  } catch (err) {
    console.log(err, "Something went wrong while getting department data");
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting department data",
      result: null
    });
  }
}

module.exports = getDepartment;
