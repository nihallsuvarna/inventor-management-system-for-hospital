const supplierSeedData = require("../data/supplier-seed-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Suppliers", supplierSeedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Suppliers", null, {});
  }
};
