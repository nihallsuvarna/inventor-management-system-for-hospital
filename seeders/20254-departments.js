const departments = require("../data/department-seed-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Departments", departments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Departments", null, {});
  }
};
