const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
      label: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    // Role.belongsToMany(db.User, {
    //   through: "UserRole",
    //   foreignKey: "role_id"
    // });
  
    return Role;
  };
  