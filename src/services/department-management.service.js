const { Department, User, Role } = require("../models");

class DepartmentManagementService {
  static async allDepartments() {
    return await Department.findAll();
  }

  static async checkIfDepartmentExistsByKey(key) {
    const department = await Department.findOne({ where: { key } });
    return department;
  }

  static async checkIfDepartmentExistsById(id) {
    const department = await Department.findByPk(id);
    return department;
  }

  static async createDepartment(departmentData) {
    return await Department.create(departmentData);
  }

  static async updateDepartment(id, departmentData) {
    return await Department.update(departmentData, { where: { id } });
  }

  static async deleteDepartment(id) {
    return await Department.destroy({ where: { id } });
  }

  static async allUserOfDepartment(id) {
    return await User.findAll({
      where: {
        department_id: id
      },
      include: [
        { model: Role, as: "roles" },
        { model: Department, as: "department" }
      ]
    });
  }
}

module.exports = DepartmentManagementService;
