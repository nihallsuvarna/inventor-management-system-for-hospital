const itemData = require("../data/item-seed-data");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Items", itemData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  }
};
