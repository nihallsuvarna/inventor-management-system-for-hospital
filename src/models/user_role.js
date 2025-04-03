module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("UserRole", {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id"
      }
    }
  });

  return UserRole;
};
