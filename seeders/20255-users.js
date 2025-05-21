const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password1234", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Nihal",
          email: "nihal@gamil.com",
          password: hashedPassword,
          department_id: 1,
          address: "123 Main Street",
          contact: 1234567890,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
