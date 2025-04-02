const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("UserRole", {
    user_id: {
      type: DataTypes.INTEGER,
      references: db.User,
      references_key: "user_id"
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: db.Role,
      references_key: "role_id"
    }
  });

  return UserRole;
};
