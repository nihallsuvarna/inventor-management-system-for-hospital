const modules = require("../data/module-seed-data");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Modules", modules, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Modules", null, {});
  }
};
