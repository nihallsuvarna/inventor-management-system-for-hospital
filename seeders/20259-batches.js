const batchData = require("../data/batch-seed-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Batches", batchData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Batches", null, {});
  }
};
