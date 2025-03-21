const { Module } = require("../models");

class ModuleService {
  static async getModuleById(moduleId) {
    const module = await Module.findOne({ where: { id: moduleId } });
    return module;
  }

  static async getModuleByKey(key) {
    const module = await Module.findOne({ where: { key } });
    return module;
  }

  static async getModuleByLabel(label) {
    const module = await Module.findOne({ where: { label } });
    return module;
  }

  static async listAllModules() {
    const modules = await Module.findAll();
    return modules;
  }

  static async createModule(moduleData) {
    const module = await Module.create(moduleData);
    return module;
  }

  static async updateModule(moduleId, moduleData) {
    const module = await Module.update(moduleData, {
      where: { id: moduleId }
    });
    return module;
  }

  static async deleteModule(moduleId) {
    const module = await Module.destroy({
      where: { id: moduleId }
    });
    return module;
  }
}

module.exports = ModuleService;
