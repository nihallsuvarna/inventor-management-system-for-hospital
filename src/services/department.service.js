const { Department } = require("../models");

class DepartmentService {
  static async getDepartmentById(departmentId) {
    const department = await Department.findOne({
      where: { id: departmentId }
    });
    return department;
  }

  static async getDepartmentByKey(key) {
    const department = await Department.findOne({ where: { key } });
    return department;
  }

  static async getDepartmentByLabel(label) {
    const department = await Department.findOne({
      where: { label }
    });
    return department;
  }

  static async listAllDepartments() {
    const departments = await Department.findAll();
    return departments;
  }

  static async createDepartment(departmentData) {
    const department = await Department.create(departmentData);
    return department;
  }

  static async updateDepartment(departmentId, departmentData) {
    const department = await Department.update(departmentData, {
      where: { id: departmentId }
    });
    return department;
  }

  static async deleteDepartment(departmentId) {
    const department = await Department.destroy({
      where: { id: departmentId }
    });
    return department;
  }
}

module.exports = DepartmentService;
