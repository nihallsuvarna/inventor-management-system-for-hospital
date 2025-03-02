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
      references: db.Department,
      references_key: "department_id"
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

  User.associate = function (models) {
    User.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department"
    });
  };

  return User;
};
