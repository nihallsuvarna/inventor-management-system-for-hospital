const { DepartmentManagementService } = require("../services");

async function getAllDepartments(req, res) {
  try {
    const allDepartments = await DepartmentManagementService.allDepartments();
    return res.status(200).json({
      status: 200,
      message: "Departments fetched successfully",
      result: allDepartments
    });
  } catch (error) {
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting department data",
      result: error
    });
  }
}

async function createNewDepartment(req, res) {
  try {
    const { label, key } = req.body;

    if (label.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Label cannot be empty",
        result: null
      });
    }

    if (key.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Key cannot be empty",
        result: null
      });
    }

    const department =
      await DepartmentManagementService.checkIfDepartmentExistsByKey(key);
    if (department) {
      return res.status(400).json({
        status: 400,
        message: "Department already exists",
        result: null
      });
    }

    const newDepartment = await DepartmentManagementService.createDepartment(
      req.body
    );

    return res.status(200).json({
      status: 200,
      message: "Department created successfully",
      result: newDepartment
    });
  } catch (error) {
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while creating department",
      result: error
    });
  }
}

async function updateDepartmentData(req, res) {
  try {
    const { id } = req.params;
    const { label } = req.body;

    if (label.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Label cannot be empty",
        result: null
      });
    }

    const department =
      await DepartmentManagementService.checkIfDepartmentExistsById(id);

    if (!department) {
      return res.status(400).json({
        status: 400,
        message: "Department does not exist",
        result: null
      });
    }

    const updatedDepartment =
      await DepartmentManagementService.updateDepartment(id, req.body);

    if (!updatedDepartment) {
      return res.status(400).json({
        status: 400,
        message: "Department does not exist",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Department updated successfully",
      result: updatedDepartment
    });
  } catch (error) {
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while updating department",
      result: error
    });
  }
}

async function deleteDepartmentData(req, res) {
  try {
    const { id } = req.params;

    const department =
      await DepartmentManagementService.checkIfDepartmentExistsById(id);

    if (!department) {
      return res.status(400).json({
        status: 400,
        message: "Department does not exist",
        result: null
      });
    }

    const deletedDepartment =
      await DepartmentManagementService.deleteDepartment(id);

    if (!deletedDepartment) {
      return res.status(400).json({
        status: 400,
        message: "Department does not exist",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Department deleted successfully",
      result: deletedDepartment
    });
  } catch (error) {
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while deleting department",
      result: error
    });
  }
}

async function getAllDepartmentUsers(req, res) {
  try {
    const { id } = req.params;

    const department =
      await DepartmentManagementService.checkIfDepartmentExistsById(id);

    if (!department) {
      return res.status(400).json({
        status: 400,
        message: "Department does not exist",
        result: null
      });
    }

    const departmentUsers =
      await DepartmentManagementService.allUserOfDepartment(id);

    if (!departmentUsers) {
      return res.status(400).json({
        status: 400,
        message: "Department does not exist",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Department users fetched successfully",
      result: departmentUsers
    });
  } catch (error) {
    console.log(error, "Something went wrong while getting department users");
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting department users",
      result: error
    });
  }
}

module.exports = {
  getAllDepartments,
  createNewDepartment,
  updateDepartmentData,
  deleteDepartmentData,
  getAllDepartmentUsers
};
