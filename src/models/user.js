const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Department", // Corrected reference
        key: "id" // Corrected reference key
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return User;
};

// User.associate = function (models) {
//   User.belongsTo(models.Department, {
//     foreignKey: "department_id",
//     as: "department"
//   });
//   User.hasMany(models.UserRole, { // Corrected to hasMany
//     foreignKey: "user_id",
//     as: "userRoles" // Corrected the alias to plural form
//   });
// };
