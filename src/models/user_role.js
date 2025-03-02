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

  UserRole.associated = function (models) {
    UserRole.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
    UserRole.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role"
    });
  };

  return UserRole
};
